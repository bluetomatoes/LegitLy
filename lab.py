def run():
	check = raw_input("Force size: ")
	force = int(check)
	print( "friction force is " + str(force * 0.132) + " N")
while True:
	if raw_input("press r to run ") == "r":
		run()
