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

- Before you proceed, make sure you have installed [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started&locale=en-US) in your deployment machine.

- From the cloned repo, goto **competitors-websites** directory in terminal, and run the following commands to deploy the Application to IBM Cloud Foundry.

```bash
$ cd competitors-websites/
```

* Log in to your IBM Cloud account, and select an API endpoint.
```bash
$ ibmcloud login
```

>NOTE: If you have a federated user ID, instead use the following command to log in with your single sign-on ID.

```bash
$ ibmcloud login --sso
```

* Target a Cloud Foundry org and space:
```bash
$ ibmcloud target --cf
```

* From within the competitors-websites directory push your app to IBM Cloud.
```bash
$ ibmcloud cf push competitors-websites
```

- The [manifest.yml](competitors-websites/manifest.yml) file will be used here to deploy the application to IBM Cloud Foundry.

- On Successful deployment of the application you will see something similar on your terminal as shown.

<pre><code>Invoking 'cf push'...

Pushing from manifest to org XXXXXXXX@in.ibm.com / space dev as XXXXXXXX@in.ibm.com...

...

Waiting for app to start...

name:              competitors-websites
requested state:   started
routes:            <b>competitors-websites.xx-xx.mybluemix.net </b>
last uploaded:     Sat 16 May 18:05:16 IST 2020
stack:             cflinuxfs3
buildpacks:        python

type:            web
instances:       1/1
memory usage:    256M
start command:   python app.py
     state     since                  cpu     memory           disk           details
#0   <b>running</b>   2020-05-16T12:36:15Z   25.6%   116.5M of 256M   796.2M of 1
</code></pre>

* Once the app is deployed you can visit the `routes` to launch the application.

>Example: 
 > - http://competitors-websites.xx-xx.mybluemix.net/vendor1
 > - http://competitors-websites.xx-xx.mybluemix.net/vendor2
 > - http://competitors-websites.xx-xx.mybluemix.net/vendor3

>> Note: Since this is an open source project it is restricted to extract information from private ecommerce websites. Hence we are showcasing the pattern with custom websites.

### 4. Setup IBM Cloud Function

IBM Cloud Function is a Serverless Architecture where in a user can write a snippet of code and run it as API's without worrying about deploying it. A code snippet can easily be attached to an already existing deployment to add more Functionality.

- Goto [IBM Cloud Resources](https://cloud.ibm.com/resources), and click on the **hamburger menu** and select **Functions > Actions** as shown. 

![cloud-functions](doc/source/images/cloudaction.png)

- In Cloud Actions page, click on **Create** to get started.

![](doc/source/images/cloudfunctions1.png)

- A **Single entities** list with Actions, Triger, Sequence, Quickstart Templates and Installable Packages will be presented. Select the **Action** to proceed.

![](doc/source/images/cloudfunctions2.png)

- Enter a `name` for the action, you can either create a custom package or leave it as `default package` and lastly select the `Runtime` as `Python 3.7` and click on **Create**.

![](doc/source/images/cloudfunctions3.png)

- An IDE with Hello World code written in python will be presented, replace everything from the IDE with the code present in the file [`food-visual-recognition.py`](pricing-tool.py).

![](doc/source/images/cloudfunctions4.png)

- After adding the code, click on the **Save** button to save the cloud function.

![](doc/source/images/cloudfunctions5.png)

- Once the Cloud Function is code ready, you need to expose an API so that the Backend server can interact with the written code. Click on **Endpoints** and **Enable as Web Action** and finally click on **Save** button as shown.

![](doc/source/images/cloudfunctions6.png)

- After you have enabled as **Web Action** you will see a `URL`, copy the `URL` as it will be used in the next step.

![](doc/source/images/cloudfunctions7.png)

- At this point, you have successfully setup a serverless cloud function.

### 5. Run the application


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

### 6. Analyze the results

