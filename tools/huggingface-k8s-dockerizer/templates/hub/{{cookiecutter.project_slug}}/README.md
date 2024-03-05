# {{ cookiecutter.project_slug }}

Wrapper around a docker image {{ cookiecutter.repo_url }} for easier k8s integration.

Note `alias b="bun run"`  & `alias k="kubectl"`


## Docker 

- **test** image locally `b start` & goto http://localhost:{{ cookiecutter.host_port }}
- url not working? `b stop` and run interactively `b bash`

- login to docker hub
    > get a personal access token (PAT) at   https://hub.docker.com/settings/security
    > create repo on dockerhub `https://hub.docker.com/repository/create?namespace={{ cookiecutter.docker_user }}`

    store it somewhere save e.g. via `pass`
    `pass docker/pat | docker login  -u {{ cookiecutter.docker_user }} --password-stdin`

- **upload to dockerhub** `bun run docker-push`

##  deploy on k8s

- first **login to k8s** (in my case `k get pods` and follow password prompt)

- set the default namespace `b k-set`
- deploy to kubernetes `b k8s-up`
- remove deployment from kubernetes again `b k8s-down`
