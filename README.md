docker-kue-debugger
===================

A simple container that connect to Redis to externally simulate receiving and executing kue jobs.

##### Parameters to customize your command
 - [Environnement] KUE_PREFIX  (no default)
 - [Environnement] REDIS_DATABASE  (no default)
 - [Link] = Your redis container

#### Example

```bash
docker run --rm -it \
	-e KUE_PREFIX=kue \
	-e REDIS_DATABASE=3 \
	--link="redis:redis" \
	kue-debugger
```


#### Example for integration in fig.yml

```
kue-worker:
  image: rednetio/kue-debugger:1.0.0
  links:
   - "redis:redis"
  environment:
    KUE_PREFIX: kue
    REDIS_DATABASE: 3
```

#### Contributing

Do not hesitate to propose pull request or just open an issue.
https://github.com/rednetio/docker-kue-debugger/issues
