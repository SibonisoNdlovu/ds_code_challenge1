import numpy as np
import pandas as pd
import geopandas as gpd
import h3
import logging
import time
from shapely.geometry import Point

start_time = time.time()

# Set the error threshold for logging
error_threshold = 0.05  # 5% (You can adjust this threshold as needed)

# Configure logging
logging.basicConfig(filename='join_log.txt', level=logging.INFO)

# Load the service request dataset
service_requests = pd.read_csv('challenge/backend/sr.csv')

# Load the hexagon polygons from the GeoJSON file
hex_polygons = gpd.read_file('challenge/backend/city-hex-polygons-8.geojson')

# Fill missing Latitude and Longitude fields with 0
service_requests['latitude'].fillna(0, inplace=True)
service_requests['longitude'].fillna(0, inplace=True)

# Create a geometry column with Point objects
svc_req_geo = [Point(xy) for xy in zip(
    service_requests['longitude'], service_requests['latitude'])]

# Define columns to keep in the final DataFrame
svc_field_list = ["notification_number", "reference_number", "creation_timestamp", "completion_timestamp", "directorate", "department",
                  "branch", "section", "code_group", "code", "cause_code_group", "cause_code", "official_suburb", "latitude", "longitude"]
hex_ply_list = ["h3_level8_index"]

# Create a GeoDataFrame from the service request dataset
svc_regdf = gpd.GeoDataFrame(
    service_requests, crs="EPSG:4326", geometry=svc_req_geo)

# Perform a spatial join
joined = gpd.sjoin(svc_regdf, hex_polygons, how="left", op='within')

# Load the validation data
validation_data = pd.read_csv('challenge/backend/sr_hex.csv.gz')

# Check if Latitude and Longitude fields are empty, set index value to 0
joined['latitude'].fillna(0, inplace=True)
joined['longitude'].fillna(0, inplace=True)

# Merge the joined data with validation_data
merged_data = validation_data.merge(
    joined[['notification_number', 'h3_level8_index']], on='notification_number', how='left')

# Calculate the percentage of records without a join
missing_percentage = (
    merged_data['h3_level8_index'].isnull().sum() / len(merged_data)) * 100

# Log the number of records without a join
logging.info(f"Number of records without a join: {missing_percentage:.2f}%")

# Check if the error threshold is exceeded and log an error if necessary
if missing_percentage > error_threshold:
    logging.error("Error threshold exceeded. Script will error out.")
    raise ValueError("Error threshold exceeded.")

# Print rows that are not present in the GeoDataFrame
rows_not_in_joined = merged_data[merged_data['h3_level8_index'].isnull()]
print("Rows not present in GeoDataFrame:")
print(rows_not_in_joined)

# Calculate and log the execution time
execution_time = time.time() - start_time
logging.info(f"Execution time: {execution_time:.2f} seconds")
