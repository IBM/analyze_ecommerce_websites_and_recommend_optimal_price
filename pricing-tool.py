import sys
import requests
from bs4 import BeautifulSoup


def main(dict):
    response = {}
    if dict.get('type') == 1:
        url = "http://XXXXXXX.eu-gb.mybluemix.net/"
        response = price(url)
    elif dict.get('type') == 2:
        MRP = dict['MRP']
        products = dict['products']
        Actual_Profit_Margin = dict['Actual_Profit_Margin']
        Required_Minimum_Profit = dict['Required_Minimum_Profit']
        details = predict_optimal_price(products,MRP, Actual_Profit_Margin, Required_Minimum_Profit)
        Least_Price = details['Least_Price']
        Minimum_Selling_Price = details['Minimum_Selling_Price']
        Profit = -1
        Predicted_price = -1
        Total_profit = -1
        response = {}
        Profit = Least_Price-Minimum_Selling_Price
        if Profit <= 0:
            Predicted_price = Minimum_Selling_Price
            response['Optimal_Selling_Price']=Predicted_price
            Total_profit = Required_Minimum_Profit
            response['Total_Profit'] = Total_profit
        else:
            Predicted_price = Minimum_Selling_Price + int(Profit/2)
            response['Optimal_Selling_Price']=Predicted_price
            Total_profit = Required_Minimum_Profit + int(Profit/2)
            response['Total_Profit'] = Total_profit
        response['Least_Price'] = Least_Price
        response['Minimum_Selling_Price'] = Minimum_Selling_Price
        # The profit and non-profit range
        Range = {}
        NonRange = {}
        profit = (Least_Price-Minimum_Selling_Price)
        if Profit <= 0:
            s = Least_Price - (MRP - Actual_Profit_Margin)
            NonRange["n1"] = 0
            NonRange["n2"] = NonRange["n1"] + int(s/2)
            NonRange["n3"] = NonRange["n2"] + int(s/2)
            NonRange["n4"] = Actual_Profit_Margin
        else: 
            Range["p1"] = Required_Minimum_Profit
            Range["p2"] = Range["p1"] + int((Least_Price-Minimum_Selling_Price)/3)
            Range["p3"] = Range["p2"] + int((Least_Price-Minimum_Selling_Price)/3)
            Range["p4"] = Range["p3"] + int((Least_Price-Minimum_Selling_Price)/3)
        response['Non_Profit_Range'] = NonRange
        response['Profit_Range'] = Range
        # The optimal price range
        Non_profit_optimal_scale = {}
        Optimal_scale={}
        if Profit <= 0:
            s = Least_Price - (MRP - Actual_Profit_Margin)
            Non_profit_optimal_scale["x1"] = MRP - Actual_Profit_Margin
            Non_profit_optimal_scale["x2"] = Non_profit_optimal_scale["x1"] + int(s/2)
            Non_profit_optimal_scale["x3"] = Non_profit_optimal_scale["x2"] + int(s/2)
            Non_profit_optimal_scale["x4"] = MRP
        else:
            Optimal_scale["g1"] = MRP - (Actual_Profit_Margin - Required_Minimum_Profit)
            Optimal_scale["g2"] = Optimal_scale["g1"] + int((Least_Price-Optimal_scale["g1"])/3)
            Optimal_scale["g3"] = Optimal_scale["g2"] + int((Least_Price-Optimal_scale["g1"])/3)
            Optimal_scale["g4"] = Least_Price
        response['Non_profit_optimal_Price_Range'] = Non_profit_optimal_scale
        response['Optimal_Price_Range'] = Optimal_scale
        # The actual price range
        Actual_scale={}
        Actual_scale["y1"] = MRP - Actual_Profit_Margin
        Actual_scale["y2"] = Actual_scale["y1"] + int(Actual_Profit_Margin/3)
        Actual_scale["y3"] = Actual_scale["y2"] + int(Actual_Profit_Margin/3)
        Actual_scale["y4"] = MRP
        response['Actual_Price_Range'] = Actual_scale

    return { 'responseforapi': response }

def scrape_1(url,tags):  
    headers ={
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.in/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
    r = requests.get(url, headers=headers)
    #print("Amazon :")
    soup = BeautifulSoup(r.text,'html.parser')
    response={}
    for i in soup.select(tags['name_1']['css']):
        response['name_1']=i.text
        break
    for i in soup.select(tags['price_1']['css']):
        response['price_1']=i.text
        break
    return response

def scrape_2(url,tags):  
    r = requests.get(url)
    #print("Flipkart :")
    soup = BeautifulSoup(r.text,'html.parser')
    response={}
    for i in soup.select(tags['name_2']['css']):
        response['name_2']=i.text
        break
    for i in soup.select(tags['price_2']['css']):
        response['price_2']=i.text
        break
    return response

def scrape_3(url,tags):
    r = requests.get(url)
    #print("Reliance Digital :")
    soup = BeautifulSoup(r.text,'html.parser')
    response={}
    for i in soup.select(tags['name_3']['css']):
        response['name_3']=i.text
        break
    for i in soup.select(tags['price_3']['css']):
        response['price_3']=i.text
        break
    for i in soup.select(tags['mrp']['css']):
        response['mrp']=i.text
        break
    return response

def price(url):
    tags = {'name_1': {'css': 'h2.vendorname'}, 'price_1': {'css': 'h4.price'}, 'name_2': {'css': 'h2.vendorname'}, 'price_2': {'css': 'h4.price'},'name_3': {'css': 'h2.vendorname'}, 'price_3': {'css': 'h4.price'},'mrp': {'css': 'label.mrp'}}
    products = {}
    data1 = scrape_1(url+"vendor1",tags) 
    if data1:
        name = data1['name_1'].strip()
        price = data1['price_1']
        string = price.split('₹')[1].lstrip().rstrip()
        products["A"]=string
        #print(name,":",string)

    data2 = scrape_2(url+"vendor2",tags) 
    if data2:
        name = data2['name_2'].strip()
        price = data2['price_2']
        string = price.split('₹')[1].lstrip().rstrip()
        products["F"]=string
        #print(name,":",string)

    data3 = scrape_3(url+"vendor3",tags) 
    if data3:
        name = data3['name_3'].strip()
        price = data3['price_3']
        string = price.split('₹')[1].lstrip().rstrip()
        products["R"]= string
        #print(name,":",string)
    for k,v in products.items():
        products[k] = int(float(v.replace(",", "")))
    
    x = data3['mrp'].split('₹')[1].lstrip().rstrip()
    products["mrp"] = int(float(x.replace(",", "")))
    return(products)

def predict_optimal_price(prices, MRP, Actual_Profit_Margin, Required_Minimum_Profit):
    Actual_Price = MRP
    Actual_Profit_Margin = Actual_Profit_Margin
    Required_Minimum_Profit = Required_Minimum_Profit
    Least_Price = -1
    Minimum_Selling_Price = -1
    response = {}
    Minimum_Selling_Price = Actual_Price - (Actual_Profit_Margin - Required_Minimum_Profit)
    response['Minimum_Selling_Price'] = Minimum_Selling_Price
    for k,v in prices.items():
        if Least_Price == -1 and v != -1:
            Least_Price = v
            response['Least_Price'] = v
        elif Least_Price > v and v != -1:
            Least_Price = v
            response['Least_Price'] = v
    
    return(response)