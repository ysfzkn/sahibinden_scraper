"""
    www.sahibinden.com scraping automobile priceses

"""
import csv
from os import X_OK
import requests 
from bs4 import BeautifulSoup
import pandas as pd
import time
import json

start_time = time.time()

links = list()
price = list()
year = list()
series = list()
model  = list()
km  = list()
color  = list()

counter = 0
ad_count = 1000 # siteden bakılabilecek max toplam ilan sayısı
step = 50  # her sayfada 50 ilan görünecek şekilde ayarlandı


def get_price(soup): # ilandaki arabanın fiyatını çeker

    global price 
    for k in soup.find_all("td" , attrs= {"class": "searchResultsPriceValue"}):
        value = k.text
        value = value.split()
        price.append(str(value[0])+str(value[1]))
 

def get_model_year(soup): # ilandaki arabanın model yılını çeker

    global year
    global color
    global km
    attrs = []

    for k in soup.find_all("td" , attrs= {"class": "searchResultsAttributeValue"}):
        value = k.text
        new = value.split()
        attrs.append(str(new[0]))

    for i in range(0,50*3):
        if i == 0 or i%3 == 0 :
            year.append(attrs[i])
        elif i%3 == 1:
            km.append(attrs[i])
        elif i%3 == 2:
            color.append(attrs[i])

def get_title(soup): # ilanın başlığının linkini çeker

    global links
    for k in soup.find_all("td" , attrs= {"class": "searchResultsTitleValue"}):
        temp_link = k.find("a", attrs= {"class": "classifiedTitle"}).get("href")
        link = "https://www.sahibinden.com/" + temp_link.strip()
        #print(link)
        links.append(link)

def to_dict():
    data = []

    for i in range(0,ad_count):
        data.append({ "price" : price[i],
                          "year" : year[i],
                          "km" : km[i],
                          "color" : color[i] })

    #df = pd.DataFrame.from_dict(data,orient='index',columns=["fiyat","yıl","km","renk"])
    #df.to_csv('ilanlar.csv',index=False)
    #df.head(3)
    #df.to_excel("ilanlar.xlsx")
    return json.dumps(data)

if __name__ == "__main__":
    headers = {'Upgrade-Insecure-Requests': '1', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'}

    session = requests.Session()
    session.headers.update(headers)

    for i in range(0,ad_count,step):      

        url = f"https://www.sahibinden.com/toyota?pagingOffset={i}&pagingSize=50"
        response = session.get(url , timeout=1.5)
        soup =  BeautifulSoup(response.content, "lxml")  # sitenin contenti alınır
        
        get_title(soup)
        get_price(soup)
        get_model_year(soup)
        
        #print(len(price),len(year),len(links),len(color),len(km))
        
    data = to_dict()
    print(json.dumps(data))
    json_object = json.dumps(data, indent = 4)
  
    # Writing to result.json
    with open("result.json", "w") as outfile:
        outfile.write(json_object)
   
    print("--- %s seconds ---" % (time.time() - start_time))
