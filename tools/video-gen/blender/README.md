
- This command runs a Python expression to set the resolution before starting the animation render.
    - blender -b /path/to/your/project.blend --python-expr "import bpy; bpy.context.scene.render.resolution_x = 1920; bpy.context.scene.render.resolution_y = 1080" -a


- blender -b /path/to/your/project.blend --python /path/to/script.py -a