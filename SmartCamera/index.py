# from picamera import PiCamera
# from datetime import datetime
# from time import sleep

# picam = PiCamera()

# picam.start_preview()
# sleep(5)
# filename ='/home/pi/pics/'+datetime.now().strftime("%Y%m%d%H%M%S%f")+'.jpg'
# picam.capture(filename)

# picam.stop_preview()

import http.client, urllib.parse

#query_args = ''{ 'RPI':'Active' }''

url = 'https://ipfs.infura.io/ipfs/QmTgC2pWbbAfZ5UpRYsLgi62qbcormwnA1QBH2jarFwJ8Z'
params = urllib.parse.urlencode({'@number': 12524, '@type': 'issue', '@action': 'show'})
conn1 = http.client.HTTPConnection(url)

conn = http.client.HTTPSConnection(conn1)
conn.request("GET", "/")
r1 = conn.getresponse()
print(r1.status, r1.reason)

