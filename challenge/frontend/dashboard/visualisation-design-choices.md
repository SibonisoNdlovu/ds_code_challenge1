## Visualization Design Choices 

## Dashboard

I decided to make the header background Blue as this is a Water and Sanitation dashboard. I added filters that will filter all the components in the dashboard instead of adding all of them sperately in Components.

Components do have their own filters.

## MAP

## Color Choice
Marker Icon Color: The default Leaflet marker icon is used, which typically has a blue icon with a white border. This color choice is based on convention and familiarity. The blue color is associated with map markers, making them easily recognizable.

## Font
Font Choice: The default font styles are used for text elements within the map. This choice is made to maintain consistency with Leaflet's default styling.


## Readability: 
The default font ensures that text, labels, and pop-up content are easily readable without the need for extensive customization.

## Consistency: 
It provides a consistent appearance that users are familiar with when interacting with maps.

## Layout
Map Position: The map is centered on coordinates [-33.87283933403916, 18.52248797221645], and the initial zoom level is set to 12. This positioning and zoom level are chosen to provide a suitable starting view of the map based on the dataset and use case.

## Filter Placement: 

Filters (location filter, complaint filter, and complaints slider) are placed above the map container. This layout choice is made for the following reasons:

Visibility: Placing the filters above the map ensures their visibility to users, making it clear that they can interact with the data.

Logical Flow: The filter placement logically connects user inputs with the map, creating an intuitive flow for data exploration.

Interactivity
Filters: Users can interact with filters to refine the data displayed on the map. They can filter by location, complaint type, and control the number of complaints shown using the slider.

Customization: 
Users have the flexibility to focus on specific locations or complaint types.

Exploration: 
The interactivity encourages users to explore and gain insights based on their preferences and interests.


## Marker Pop-ups: 
Pop-ups are provided for each map marker, showing detailed information about each complaint when clicked. This interactivity allows users to access specific complaint details.


## Bar Chart

## Color Choice 

The Color I chose is red, I initially wanted to configure it so that red is for the bar that has the most numbers and green for the least, but instead decided to use red as a sign of urgency and attention.

## Filters

I added 2 filters, Location and Service Type so that a user can filter using those 2. For example if a user wants to see number of issues for specific location or if a user wants to see the Service Type that is most required throughout the city.

## Pie Chart

I added the pie chart so I can see which area needs the most attention.

The idea of the color scheme was to have the area with the most issues be red and the least be green and then code it to autogenerate the colors based on data provided.

I also added percentage to the pie chart so that a user can see the percentage of issues in each area.