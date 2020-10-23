# Analyze e-commerce websites and recommend optimal price for a product

Any e-commerce vendor who is selling a competitive product online, would want their sales to be maximum. One of the important factor that users see in buying a competitive product is the selling price that the vendor is offering. In order to sell maximum products a vendor would need to give the product at best selling price in the market, without compromising on the desired profits.

In this code pattern, we will develop an interactive UI integrated with custom backend that will help the e-commerce vendors decide on an optimal selling price such that their chances of sales will increase and at the same time maintain their desired profits.

![](doc/images/architecture.png)

## Flow


## Pre-requisites
* [IBM Cloud account](https://www.ibm.com/cloud/): Create an IBM Cloud account.
* [Python 3](https://www.python.org/downloads/): Install python 3.

# Steps

Please follow the below to setup and run this code pattern.

1. [Clone the repo](#1-clone-the-repo)
2. [Setup MongoDB on IBM Cloud](#2-setup-mongodb-on-ibm-cloud)
3. [Host competitors webpage on cloud](#3-host-competitors-webpage-on-cloud)
4. [Setup IBM Cloud Function](#4-setup-ibm-cloud-function)
5. [Run the application](#5-run-the-application)
6. [Analyze the results](#6-analyze-the-results)

### 1. Clone the repo

Clone this [git repo](https://github.com/IBM/analyze_ecommerce_websites_and_recommend_optimal_price).
Else, in a terminal, run:

```
$ git clone https://github.com/IBM/analyze_ecommerce_websites_and_recommend_optimal_price
```
### 2. Setup MongoDB on IBM Cloud

### 3. Host competitors webpage on cloud

### 5. Setup IBM Cloud Function

### 6. Run the application


<details><summary><b>With Docker Installed</b></summary>

- change directory to repo parent folder :
    
```bash
$ cd analyze_ecommerce_websites_and_recommend_optimal_price/
```

- Build the **Dockerfile** as follows :

```bash
$ docker image build -t recommend_optimal_price .
```

- once the dockerfile is built run the dockerfile as follows :

```bash
$ docker run -p 8080:8080 recommend_optimal_price
```

- The Application will be available on <http://localhost:8080>

</details>

<details><summary><b>Without Docker</b></summary>

- Install the python libraries as follows:

    - change directory to repo parent folder
    
    ```bash
    $ cd analyze_ecommerce_websites_and_recommend_optimal_price
    ```

    - use `python pip` to install the libraries

    ```bash
    $ pip install -r requirements.txt
    ```

- Finally run the application as follows:

```bash
$ python app.py
```

- The Application will be available on <http://localhost:8080>

</details>

### 5. Analyze the results

