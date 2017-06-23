build:
	docker build -t current-game-rankings .

deploy:
	kubectl apply -f ./kubernetes
