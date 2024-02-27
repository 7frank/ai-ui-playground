
- This command runs a Python expression to set the resolution before starting the animation render.
    - blender -b /path/to/your/project.blend --python-expr "import bpy; bpy.context.scene.render.resolution_x = 1920; bpy.context.scene.render.resolution_y = 1080" -a


## convert videos with blender

- blender -b --python blender/config.py -a

**or**

- blender  --python blender/config.py 

for debugging


## install custom python packages into blender python
```bash
# cd into wherever your python is installed
cd /snap/blender/4300/4.0/python 

# install pip
bin/python3.10 -m ensurepip

# install the packages you need, eg. wcmatch
bin/python3.10  -m pip install wcmatch
```