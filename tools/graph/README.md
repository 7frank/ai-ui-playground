# overview

- fiddling with data

# setup


## scaping
 install pyenv
 install conda  https://linuxhint.com/install-and-use-miniconda-on-linux-mint/
 install mamba 

> mamba create -n your_env_name
> mamba activate your_env_name

`mamba env create -n mEnv -f=environment.yml `


`mamba env export --from-history | grep -v "^prefix: " > environment.yml`

download  language model which is not part of the repo
`python -m spacy download en_core_web_sm`


## setup neptune

- edit `.env` set  NEPTUNE_API_TOKEN




# TODO / Backlog 
- check out https://python-poetry.org/docs/basic-usage/ for easier verion pinning compared to mamba (--from-version *not pinned* vs. no flag *pinned*)
- pin versions with whatever tool
- test out mojo kernel