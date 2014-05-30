i = 0
count = 0
n = input("total number of tries?")
while i < n:
	count = count + 10 * 0.5**i
	i+=1
if i == n:
	print(count)