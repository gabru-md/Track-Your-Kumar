# imports
import cv2

# initialising camera
cap = cv2.VideoCapture(0) # 0 is the index of the camera! here 0 means primary camera


ret,frame = cap.read()


while ret: 

	# show the image if image is captured
	cv2.imshow("Captured Image",frame)
	"""
	Uncomment the following lines if you
	want to convert the image into grayScale
	"""
	#gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
	#cv2.imshow("GrayScale Image",gray)
	
	ret,frame = cap.read()	 # reading once again to continue the loop

	if cv2.waitKey(1) & 0xff == 27: # Pressing escape will stop the feed
		cap.release() # stop camera
		break
