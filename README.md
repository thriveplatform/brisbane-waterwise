# Brisbane Waterwise Project

Recreational water-based activities are extremely popular in Brisbane. Therefore, it is extremely important to monitor the water-quality in the waterways that are visited frequently by people. The Brisbane City Council has been activity monitoring water quality in Brisbane waterways since 2011. The quality of water is assessed by checking for the levels of a bacteria known as Enterococci. The Enterococci levels are monitored at eleven highly used recreational sites in the Brisbane River and sections of the Moreton Bay. These enterococci measurements are available as an open dataset in the Brisbane City Council website.

The <b><i>objective</i></b> of the Brisbane Waterwise Project is to develop strategies to <b><i>improve water-quality in waterways</i></b> keeping in view the <b><i>Brisbane 2032 Olympics</i></b>. To learn more about the Brisbane Waterwise Project, please refer to the [Github repository](https://github.com/thriveplatform/analysts/tree/main/Brisbane%20Waterwise%20Project).

Within the context of the Brisbane Waterwise Project, this repository aims to highlight the extent of news coverage that environmental issues in general — and water-related environmental matters in particular — received in the lead-up to the Olympics.

## Approach
- Data Collection: 
  The daily top 100 article headlines related to the Olympics were retreived from one year prior to the end of the Olympics up to the closing date, i.e., 12-August-2023 to 12-August-2024 using the GNEWS.IO API.

- Relevance Assessment:
  The articles were analyzed to determine if they reflected the organization and image of the Paris Olympic games.

- Categorization of Image-Relevant Articles
  Articles relevant to the organization/image of the Games were manually labelled and sub-categorized into: -
    - Non-environmental articles
    - Environmental articles
  This breakdown has been visualized in the 'Environmental Focus in Articles Leading up to the Olympics' chart of the [visualization](https://thriveplatform.github.io/brisbane-waterwise/).


- Categorization of Evnironmental Articles
  Environmental articles were further subdivided into:
    - Non-aquatic Articles
    - Aquatice Articles
  The distribution has been visualized in the 'Aquatic Focus in Environmental Articles Leading up to the Olympics' chart of the [visualization](https://thriveplatform.github.io/brisbane-waterwise/).

## Key Artefacts
- Data Preparation & Analysis:
    - NewsAnalysis.ipynb:
      This notebook performs the following tasks:
        - Downloads the top 100 Olympics-related articles over the period of analysis using the GNEWS.io API and stores them in the articles.json file.
        - The articles are then classified as reflecting or not reflecting the image of the Paris Olympic games:
            - A manually curated training dataset was created (Labelled Data - Article Image Relevance.json) that contains examples of articles in either category.
            - A pre-trained uncased distil-BERT model (from HuggingFace) was then fine-tuned on the above dataset.
            - The fine-tuned model is then used to make predictions on the above dataset to categorize articles which are then saved in the 'image_rel_articles.json'  
              file.
        - The articles in 'image_rel_articles.json' are then manually categorized based on:
            - Content Sentiment (POSITIVE/NEGATIVE)
            - Environment Relevance (YES/NO)
            - Waterway Relevance (YES/NO)
            This categorization is then saved into a file called 'image_rel_articles_classified.json'.
        - Visuals are then presented based on the classified articles.

- Visualizations:
  This visualization highlights the level of environmental and water-related focus in Olympic media coverage leading up to the Paris 2024 games. This visualization can be viewed at https://thriveplatform.github.io/brisbane-waterwise/. 
  Associated files
    - index.html
    - style.CSS
    - BaseChart.js
    - StackedAreaChart.js
    - stacked_area_articles.js
    
- Data files:
    - articles.json: 
      Contains the top 100 daily articles related to sports and Olympics accessed via API from GNews.io.
    - Labelled Data: Article Image Relevance.json: 
      Contains articles manually classified as being related or unrelated to the organization and image of the Paris 2024 games.
    - image_rel_articles.json: 
      Contains a filtered list of articles which are all related to the organization and image of the Paris 2024 games.
    - image_rel_articles_classified.json: 
      Contains additional manual classification based on:
        - Content Sentiment (POSITIVE/NEGATIVE)
        - Environment Relevance (YES/NO)
        - Waterway Relevance (YES/NO)