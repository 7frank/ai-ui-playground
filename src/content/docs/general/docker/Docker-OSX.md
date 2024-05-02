---
title: Docker-OSX
---

https://github.com/sickcodes/Docker-OSX

https://www.youtube.com/watch?v=wLezYl77Ll8&ab_channel=SickCodes

Catalina

```bash
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    sickcodes/docker-osx:latest
```


# Catalina
# wget https://images2.sick.codes/mac_hdd_ng_auto.img
# Monterey

```bash
# wget https://images.sick.codes/mac_hdd_ng_auto_monterey.img

docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v "${PWD}/mac_hdd_ng_auto_monterey.img:/image" \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e "USERNAME=user" \
    -e "PASSWORD=alpine" \
    -e GENERATE_UNIQUE=true \
    -e MASTER_PLIST_URL=https://raw.githubusercontent.com/sickcodes/Docker-OSX/master/custom/config-nopicker-custom.plist \
    sickcodes/docker-osx:naked-auto    
```