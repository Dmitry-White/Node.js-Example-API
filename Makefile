.PHONY: clean, start, stop

clean:
	docker image rm $$(docker image ls -q)

start:
	docker-compose up -d

stop:
	docker-compose down
