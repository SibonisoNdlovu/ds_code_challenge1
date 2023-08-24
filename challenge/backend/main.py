import numpy as np
import pandas as pd
import geopandas as gpd
import h3
import logging
import time
from shapely.geometry import Point

start_time = time.time()

# Set the error threshold for logging
error_threshold = 0.1  # 10%

# Load the service request dataset
service_requests = pd.read_csv(
    'challenge/backend/sr.csv')


# Load the hexagon polygons from the GeoJSON file
hex_polygons = gpd.read_file(
    'challenge/backend/city-hex-polygons-8.geojson')

svc_req_geo = [Point(xy) for xy in zip(
    service_requests['longitude'], service_requests['latitude'])]
svc_field_list = ["notification_number", "reference_number", "creation_timestamp", "completion_timestamp", "directorate", "department",
                  "branch", "section", "code_group", "code", "cause_code_group", "cause_code", "official_suburb", "latitude", "longitude"]
hex_ply_list = ["h3_level8_index"]

svc_regdf = gpd.GeoDataFrame(
    service_requests, crs="EPSG:4326", geometry=svc_req_geo)

joined = gpd.sjoin(svc_regdf, hex_polygons, how="left", op='within')

validation_data = pd.read_csv(
    'challenge/backend/sr_hex.csv')

validation_data['in_geo_df'] = validation_data.apply(lambda row: (
    row['notification_number'], row['h3_level8_index']) in zip(joined['notification_number'], joined['index']), axis=1)

# Print rows that are not present in the GeoDataFrame
rows_not_in_joined = validation_data[~validation_data['in_geo_df']]
print("Rows not present in GeoDataFrame:")
print(rows_not_in_joined)
