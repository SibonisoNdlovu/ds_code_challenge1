import numpy as np
import pandas as pd
import geopandas as gpd
import h3
import logging
import time
from shapely.geometry import Point


def time_convert(sec):
    mins = sec // 60
    sec = sec % 60
    hours = mins // 60
    mins = mins % 60
    return "{0}:{1}:{2}".format(int(hours), int(mins), sec)


start_time = time.time()

# Set the error threshold for logging
error_threshold = 0.1  # 10%

root_dir = ""
# Load the service request dataset
service_requests = pd.read_csv(
    './sr.csv')

# Load the hexagon polygons from the GeoJSON file
hex_polygons = gpd.read_file(
    './city-hex-polygons-8.geojson')

svc_req_geo = [Point(xy) for xy in zip(
    service_requests['longitude'], service_requests['latitude'])]
svc_field_list = ["notification_number", "reference_number", "creation_timestamp", "completion_timestamp", "directorate", "department",
                  "branch", "section", "code_group", "code", "cause_code_group", "cause_code", "official_suburb", "latitude", "longitude"]
hex_ply_list = ["h3_level8_index"]

svc_regdf = gpd.GeoDataFrame(
    service_requests, crs="EPSG:4326", geometry=svc_req_geo)

joined = gpd.sjoin(svc_regdf, hex_polygons, how="left", op='within')

validation_data = pd.read_csv(
    './sr_hex.csv')

failed_to_join = 0
for id in zip(joined['notification_number'], joined['index']):
    if (pd.isna(id[1])):
        failed_to_join += 1

end_time = time.time()
print(f"Time taken: {time_convert(end_time - start_time)}")
print(f"Failed join: {failed_to_join}")
