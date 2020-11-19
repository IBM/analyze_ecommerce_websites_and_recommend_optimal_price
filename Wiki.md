# Short title

Build interactive pricing tool for e-commerce vendors

# Long title

Analyze e-commerce websites and recommend optimal price for a product

# Author

* Rahul Reddy Ravipally <raravi86@in.ibm.com>
* Manoj Jahgirdar <manoj.jahgirdar@in.ibm.com>
* Srikanth Manne <srikanth.manne@in.ibm.com>

# URLs

### Github repo

* [Build a pricing tool for retail e-commerce businesses](https://github.com/IBM/analyze_ecommerce_websites_and_recommend_optimal_price)

# Summary

In this code pattern, we will develop an interactive UI integrated with custom backend that will help the e-commerce vendors decide on an optimal selling price such that their chances of sales will increase and at the same time maintain their desired profits.

# Technologies

* [Python](https://en.wikipedia.org/wiki/Python_(programming_language)): An open-source interpreted high-level programming language for general-purpose programming.
* [Database](https://en.wikipedia.org/wiki/Database): A database is an organized collection of data, generally stored and accessed electronically from a computer system.

# Description

Any e-commerce vendor who is selling a competitive product online, would want their sales to be maximum. One of the important factor that users see in buying a competitive product is the selling price that the vendor is offering. In order to sell maximum products a vendor would need to give the product at best selling price in the market, without compromising on the desired profits.

In this code pattern, we will develop an interactive UI integrated with custom backend that will help the e-commerce vendors decide on an optimal selling price such that their chances of sales will increase and at the same time maintain their desired profits.

# Flow

![](doc/images/Architecture.png)

  1. User launches the application.
  2. Product details are retrieved from MongoDB.
  3. List of products being sold are displayed.
  4. User enters Profit Margin and Minimum Requied Profit for the product being sold.
  5. This information is sent to the backend cloud functions.
  6. Cloud Functions scrapes the competitors product details from their websites.
  7. Custom algorithm computes the optimal price and sends itback to the application.
  8. An interacive tool is displayed to the user on the UI.
  9. User uses the tool and information on the UI to set a competitive price.


# Instructions

> Find the detailed steps for this pattern in the [readme file](https://github.com/IBM/movie_ticket_booking_application_using_crunchydb/blob/master/README.md). The steps will show you how to:

1. Clone the repo
2. Setup MongoDB on CP4D
3. Host competitors webpage on cloud
4. Setup IBM Cloud Function
5. Run the application
6. Analyze the results

# Components and services

* IBM Cloud Functions
* MongoDB on IBM Cloud
* Cloud Foundry
* Flask

# Runtimes

* Python 3

# Related IBM Developer content
