.PHONY: clean, start, stop

clean:
	docker system prune -af

start:
	docker-compose up -d

stop:
	docker-compose down
