# Workflow
At the beginning of this project I used a `conceptontwikkeling werkblad` to brainstorm about my subject and come up with my first ideas. The subject that I am working with is the same subject that I used at the class `research for data`, in this case `Depression`. On basis of this "conceptontwikkeling werkblad" I came up with three ideas that gave a better insight into `depression`.

![conceptontwikkeling.png](./fotos/conceptontwikkeling.png)

![concept1.png](./fotos/concept.png)
In concept 1 I wanted to create a word map that would have his own shape on basis of the given data. So if one country had a high number of depression if would be bigger than one who has less number of depression. I really liked this idea because I thought that the map idea was not a regular one but at the same time it would be really a challenge to make it. When I was talking with my `Free space` coach about it I got the feedback that working with the shapes of the countries wouldn't really be a good idea because some countries are already really small and you wouldn't be able to gave a proper proportion to the country. So I kept this idea in mind but then I was thinking in an other way to show depression. Soon I came up with `color', every time I think about depression I think about dark shades of gray to black. While brainstorming on the web I also saw a picture that really looks like depression to me and at the same time the shape let me think of a world map.
![inspiration.jpg](./fotos/inspiration.png)
[](http://www.locustherapy.com/history-of-depression/)
From the feedback of my project coach I also got the feedback that it would be hard to get data from all the countries of the world. Not every country defines and make its own research on the same way as we in Europe, so the data wouldn't be very accurate. Because of this I decided to work only with the countries inside Europe, besides I also already had a first data about depression for the most countries in Europe from the [research case](https://luisa-braga-dos-santos.gitbooks.io/technologie-en-psychiatrie-research-case/content/onderzoek/onderzoek10.html) that I previously had made for the class Research for data.

![concept2.png](./fotos/concept2.png)
In concept 2 I wanted to create a `sunburst graph` that showed all the kind of help that a person with the depression can use. This would vary between medical assistance and food or an online support group. My feedback on this idea was that it was a nice out of the box idea but it would be hard to get the data of it, specially because I only had 2 weeks the time to work on it. This kind of data wouldn't be on the internet but it would be something that I would get from interviews.

![concept3.png](./fotos/concept3.png)
In concept 3 I only could think of a bar char that would show the consequences of depression. This would go from medical assistance to suicide. And the would be from the year 2010 to 2016.

From this three concept I chose to work with `concept 1` and make a combination with `concept 3` for `assessment A`. After I chose a basis concept I began to brainstorm again and think of the few possibilities that I had. I also started to search for the data that I would like to use. In this moment I realized that finding the right data for the graph that I had in mind a wrong think process was. So I started to only search for the data that I could find about depression in Europe between the years 2012 and 2016. Unfortunately I couldn't find data for all these years but only for the years 2014 and 2015.
While researching for the data I also saw a lot of articles talking about females having more chance to get depression than males. So I also started looking for data about female/male depression and luckily I found the data from the same countries as before and also for the years 2014 and 2015. With this data in mind I started again to think about a concept and I came up with `concept 4`.

![concept4.jpg](./fotos/concept4.png)
In this concept you would be able to see a combination between the Europe map and a dual bar chart. The Europe map would be showing the `% depression` per country and the bar chart would be showing the `% female/male depression` and the data would from the years 2014, 2015 and 2016. This graph would suit `assessment A` because it would be interactive and it would give the answers to the question `when`, `where` and `who`. While think about how I would execute it I remembered an example given in the first lecture of project one, namely the example [`Where is Breast Cancer?`](http://www.nytimes.com/2013/10/16/health/uganda-fights-stigma-and-poverty-to-take-on-breast-cancer.html?_r=1&#g-graphic). I liked the idea of showing the data in different steps, so in my mind I had the idea to show `assessment A` in the first to steps of the design and `assessment B` afterwards.

![concept5.png](./fotos/concept5.png)
In `concept 5` I also started to think about what kind of graph I would use for `assessment B`. First I thought about to go deeper in the topic of female/male depression by given a better insight then only facts about it. But then I thought about the site [`google trends`](https://trends.google.com/trends/) that I used on the class `research for data`. There I could find which words are the most goggled ones and how popular this word is in Google for a certain period. The idea was then to collect data of the 5 most researched words of the countries that I would use in the previous graphs in period of `01/01/2014 to 31/12/2016`.

## The final concept
My final concept exists of four sections and three graphs.
1. `Introduction` section
![preview.png](./fotos/preview.png)
This is where my topic is introduced. It is been introduced by the clear presence of the [background image](http://expresszine.com/depression-new-monster-bed/) and by the title and the small introduction text. I chose for this background image because It gives a clear and dark feeling about what depression is(It is like a black hole in your head).
2. `Depression in Europe` section (Assessment A)
![map-graph.png](./fotos/map-graph.png)
For this visualization I used the Europe map because the that I used for this section was about `% depression inside Europe`. I chose for a map instead of a bar chart because with the map you can see these countries are and think about any collision that could exist between some countries. Besides, I think that with a map you are more likely to explore the data by hovering and zooming in the map than only looking at some lengths of the bars.
For the visual style I chose to work with dark shades of gray to black and white for a contrast. If I had more time I would spend a little more time on the colors to put more contrast in it for a better visibility.
The information given on the right column is a short introduction about `depression in Europe` with some `depression facts`. These facts I found on [Fact sheet – Mental health](http://www.euro.who.int/__data/assets/pdf_file/0004/215275/RC63-Fact-sheet-MNH-Eng.pdf?ua=1)
For the used data see [`data`](readme.md) in the read me file.
### interaction
This graph has the following interactions:
[x] Hover for more information
[x] Zoom by clicking in one country and by pinch gestures.
[x] Dragging on the map to navigate through it.
[x] Slider navigation to navigate through the years.
[ ] I got the feedback that it would be better to use buttons instead of a slider to change the years. Because I hadn't enough time I wasn't able to change it, but I noted down on the [to do list](readme.md) in the read me file.
[x] Hovering on the legend you can visualize the countries inside the same group.

This visualization was based on the code from [The Netherlands vacation destination in ...](https://github.com/mymphy/fe3-assessment-3) originally based on [d3.js slider map](http://bl.ocks.org/tomschulze/961d57bd1bbd2a9ef993f2e8645cb8d2) by Tom Schulze (GNU v.3).

3. `Female vs Male depression` section (Assessment A)
![gender-graph.png](./fotos/gender-graph.png)
For this visualization I used a dual bar chart. I chose this chart because it is a clear form to visualize and compare two data's. In this case the data of `how many percentages of females has depression in compare to the males`. For now there isn't much interaction in it, but below you read about the interactions that I would like to have for this graph.
For the color I used two shades of gray with white for the contrast with the background.
The information given on the right column is a short introduction about `female/male depression` and some fact about it. These facts are from the [A Look at Depression Statistics](https://www.healthline.com/health/depression/statistics#2) and [7 Ways Depression Differs in Men and Women](https://www.livescience.com/56599-depression-differs-men-women-symptoms.html).
For the used data see [`data`](readme.md) in the read me file.
### interaction
This graph has the following interactions:
[x] Hover for the exact percentage.
[ ] I wanted to add the data from year 2015 as well so that the user would be able to switch between the years.
[ ] Make options to display the data alphabetically or from high to low.

This visualization was based on the code from [Languages bar chart](https://github.com/mymphy/fe3-assessment-1) originally based on [Horizontal Bar Chart with Tooltip D3 V4](https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998) by Alan Dunning (The MIT License).

4. `Top 5 search on depression` section (Assessment B)
![relation-graph.png](./fotos/relation-graph.png)
For this visualization I wanted to show the relation between the search words and the countries. I tried to code my idea but I hadn't enough time to finish it. By the interaction you can read what my ideas where that I would liked to have accomplished.
The information given on the right column is a short introduction about `depression search`, the information used can be found in [Google Search for `Depression` Now Brings Testing](https://www.medicinenet.com/script/main/art.asp?articlekey=206347) and
[Now A Tool To Diagnose Depression By Google](http://theexclusivefacts.com/2017/08/28/now-a-tool-to-diagnose-depression-by-google/). For each search word I used:
<details>
<summary> Data used:<summary>
* [depressie](https://www.vocabulary.com/dictionary/nl/depressie)
* [About the Great Depression](http://www.english.illinois.edu/maps/depression/about.htm)
* [Great Depression](https://en.wikipedia.org/wiki/Great_Depression)
* [Quotes on Depression](https://www.healthyplace.com/insight/quotes/depression-quotes-and-sayings-about-depression/)
* [Major depressive disorder](https://en.wikipedia.org/wiki/Major_depressive_disorder)
* [Depression Symptoms and Warning Signs](https://www.helpguide.org/articles/depression/depression-symptoms-and-warning-signs.htm)
* [400,000 have depression - Aware](http://www.irishhealth.com/article.html?id=10867)
* [Depression Medicines](https://www.webmd.com/depression/guide/optimizing-depression-medicines#1)
* [Angst](https://en.wikipedia.org/wiki/Angst)
* [Postpartum depression](https://en.wikipedia.org/wiki/Postpartum_depression)
* [How to Recognize and Treat the Symptoms of a Nervous Breakdown](https://www.healthline.com/health/mental-health/nervous-breakdown#overview1)
* [Post Pop Depression](https://en.wikipedia.org/wiki/Post_Pop_Depression)
* [Burnout](https://www.psychologytoday.com/basics/burnout)
* [crippling depression](https://www.urbandictionary.com/define.php?term=crippling%20depression)
* [Depression Quest](https://en.wikipedia.org/wiki/Depression_Quest)
<details>

### interaction
This graph has the following interactions:
[x] Drag and pull the words.
[ ] Make interactive options that allows the user to see the search word per country or per search words.
[ ] Zoom interaction.
[x] On hover on the word, you would get a small fact about that search word.
[ ] Assign a framework that the graph won't be able to go out of the framework.

This visualization was based on the code from [Force directed graph for D3.js v4 with labeled edges and arrows](http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1) by Dino Fancellu (GNU v.3).
 