


import network
import urequests
import json
from time import sleep
from machine import Pin,DAC,PWM,ADC
from _thread import start_new_thread as thread

rgb = [[0,0,0],[1,1,1],[1,1,0],[1,0,1],[0,1,1],[0,1,0],[0,0,1],[1,0,0]]
sleepyet = 0
sleeping = 0
posting = 0

data =  {
          "sleeptime":0,
          "light":0,
          "wakeuptime":30,
        }
R = Pin(0,Pin.OUT)
G = Pin(2,Pin.OUT)
B = Pin(15,Pin.OUT)
ldr=ADC(Pin(32))
btn = Pin(4,Pin.IN)
vibrate = Pin(18,Pin.IN)
track = Pin(19,Pin.IN)

ssid = 'exceed16_9'
pwd = '12345678'
station = network.WLAN(network.STA_IF)
station.active(True)

url = "https://exceed.superposition.pknn.dev/data/groupTen"


headers = {"content-type":"application/json"}


def printslt():
  global sleeping
  while(1):
    print(sleeping , 'seconds')
    sleep(1)
    if not data['sleeptime']:
      sleeping += 1

      
def inter():
  global data,posting
  while(1):
    while not station.isconnected():
      station.connect(ssid,pwd)
      #print('Connecting')
      #sleep(1)
      if station.isconnected():
        print('Connected')
        '''
    if posting == 1:
        js = json.dumps({"data":data})
        print('posting....')
        r = urequests.post(url, data=js,headers = headers)
        results = r.json()
        posting = 0
        print(results)
    else:
    '''
    if posting == 0:
      r = urequests.get(url).json()
      print('getting')
      sleep(0.8)
      if r!= data:
        data['light'] = int(r['light'])
        data['wakeuptime'] = int(r['wakeuptime'])
        #data = r
        print(data)
        sleep(0.2)
    else:
      post1()
def post1():
  global posting,data
  js = json.dumps({"data":data})
  print('posting....')
  r = urequests.post(url, data=js,headers = headers)
  results = r.json()
  print(results)
  sleep(2)

def led():
  global data,rgb,sleeping
  while(1):
    #print(sleeping == data['wakeuptime'])
    #print(sleeping,"----",data['wakeuptime'])
    #sleep(0.2)
    if (sleeping == data['wakeuptime']):
      data['light'] = 1
      R.value(rgb[data['light']][0])
      G.value(rgb[data['light']][1])
      B.value(rgb[data['light']][2])
      sleep(30)
      data['light'] = 0
    R.value(rgb[data['light']][0])
    G.value(rgb[data['light']][1])
    B.value(rgb[data['light']][2])

def sound_on_off():
  buzzer = 0
  for i in range(5):
    buzzer = PWM(Pin(25))
    buzzer.freq(10)
    sleep(1)
  buzzer.deinit()
    
  
def deepsl():
  global data,sleeping,posting
  while(1):
    while(not data['sleeptime'] and vibrate.value() == 0 and sleeping <= 6 and not track.value()):
      if (sleeping == 5) :
        print('hey')
        data['sleeptime'] = 1
        print(data)
        posting = 1
        #post1()
        sleep(1)
        posting = 0
        sleeping = 0
        break
    if not data['sleeptime']:
      #print('clear')
      sleeping = 0
  
def sleep1():
  global data,sleeping,posting
  slept = 0 ;wake = 0
  while(1):
    while((data['sleeptime']) and sleeping < data['wakeuptime']):
      #print(sleeping,data['wakeuptime'])
      print(data)
      print('sleeping...')
      slept = 1
      sleep(1)
      sleeping += 1
      
    if(sleeping >= data['wakeuptime'] and slept):
      while (btn.value() == 1 and data['sleeptime'] == 1):
        sound_on_off()
        if btn.value() == 0:
          sleeping = 0
          data['sleeptime'] = 0
          posting = 1
          #post1()
          sleep(0.5)
          posting = 0
          data['wakeuptime'] = 30
          break
      sleep(0.5)
  
#print(1)
thread(printslt,())
thread(inter,())
thread(sleep1,())
thread(led,())
thread(deepsl,())
#thread(getandpost,())
#print(2)
#print(3)









