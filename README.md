# Argumentative Vis

A pair of data visualizations that argue for opposing viewpoints, using the same base dataset.


## About the Debate

With over one-fifth of the American population residing in either Texas or California, these two states hold the top spots for being the most densely populated states in the USA. Choosing between Texas and California can be a challenging decision as they both offer exceptional weather, stunning landscapes, and a wide range of exciting activities. However, recent trends have shown that Texas has experienced rapid growth, making it one of the fastest-growing states in the U.S., while California has grown at a slower rate than the national average. Some portion of the people tend to prefer Texas now while others still swear by California.
A dataset related to the quality of life has been used to make the arguments. 

Link to the dataset: https://www.kaggle.com/datasets/orhankaramancode/city-quality-of-life-dataset.

This dataset was obtained from Teleport API endpoints ( https://developers.teleport.org/api/) and pre-processed before being uploaded to Kaggle. Teleport.org aggregates its data sources and computes scores for urban areas (Teleport Cities) across various different categories.

The left visualization shows a Spider/Radar chart which compares both Texas and California on their quality of life on the basis of few selected parameters like Housing, Ease of Living, Travel Connectivity, Commute and Internet Access.

The rhetorical techniques used in the chart are:
- **Simplification**: The dataset provided the values of each category city-wise. The data has been simplified by aggregating city-wise data into state to visualize comparison between states. to frame the argument.
- **Omission**: Some categories in which California is better has been omitted to persuade the user that Texas is way better.
- **Anchoring**: The left chart directs the viewer's attention by highlighting the better qualities of Texas in the Radar chart so that the values of those categories for California seem much smaller in comparison.
- **Comparison**: The radar chart shows a clear comparison between Texas and California based on certain features and color coding, and its visualized in a way that helps the user to interpret the contrasting difference in a single look.
- **Axis Scaling**: The axes have been scaled in the left Radar chart to make the difference between both the states appear more distinctive.
- **Filtering**: The data has been fitered to show only the few necessary features which show Texas is better.

The right visualization shows a Grouped Bar Chart which compares both Texas and California on their quality of life on the basis of few selected parameters like Venture Capital, Safety, Education, Tolerance and Startups.

The rhetorical techniques used in the chart are:
- **Simplification**: The dataset which had values of each category city-wise has been normalized on the scale of 1 to 10. The data has been simplified and then aggregated to show it state-wise and drive a point home, which is that California is still better.
- Omission: Some categories in which values for Texas is better have been omitted to persuade the user that California is still way better.
- Axis Scaling: The axes of the bar chart have been scaled in the right chart to make the contrast easily distinguishable.
- Anchoring: The right chart directs the viewer's attention by showing the bad qualities of Texas with respect to California side by side so that user is forced to make a comparison.
- Comparison: The grouped bar chart shows a clear comparison between Texas and California based on selected features and its visualized in a way such that values of same categories for California seem much higher in comparison and its also color coded.
- Filtering: The data has been fitered to show only selected features in which California's ratings are higher. 