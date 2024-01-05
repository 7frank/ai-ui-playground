---
title: "Comparision: Resnet50 vs. CLIP"
---


CLIP (Contrastive Language–Image Pre-training) represents a breakthrough in the field of AI, leveraging a novel training methodology and architecture to understand and interpret images in the context of natural language. Trained on over 400 million text-image pairs sourced from the internet, CLIP employs a contrastive learning approach and a dual-encoder framework, encompassing both image and text encoders. Its architecture varies depending on the chosen encoder, with options including the Vision Transformer (ViT) and ResNet variants, each contributing to the model’s versatility.

The ViT model within CLIP divides images into patches, processing them through Transformer layers, and using self-attention mechanisms to focus on various image regions. This approach allows the model to capture global image context. In contrast, ResNet, a convolutional neural network (CNN) used in CLIP, excels in hierarchical, local feature processing through convolutional layers and residual connections. This structure enables ResNet to build up a more global representation from local features.

The main distinction between ViT and ResNet in CLIP lies in their approach to image processing. ViT, treating the image more like a sequence, leverages self-attention to capture global dependencies, whereas ResNet, through its convolutional layers, focuses on extracting hierarchical spatial features.

## Overview of CLIP

CLIP (Contrastive Language–Image Pre-training) was trained using a novel approach that involved learning from a vast dataset of text-image pairs. Here's a breakdown of its training methodology and architecture:
Training Methodology:

    Data Collection: CLIP was trained on a large dataset consisting of over 400 million text-image pairs. This dataset was collected from a variety of publicly available sources on the internet, ensuring a wide range of visual and textual content.
    Contrastive Learning Approach: The training process involved using these text-image pairs in a contrastive learning setup. In simple terms, the model was trained to correctly match an image with its corresponding text description among a set of other mismatched text-image pairs.
    Dual-Encoder Framework: CLIP uses a dual-encoder architecture - one encoder for images and another for text. The image encoder and the text encoder transform their respective inputs into vectors in a shared embedding space. The goal is to maximize the similarity between the corresponding text and image vectors while minimizing the similarity with mismatched pairs.

Architecture:

    Image Encoder: The image encoder can be based on various architectures. The original CLIP paper experimented with a modified version of the Vision Transformer (ViT) and ResNet architectures for the image encoder. The choice of architecture (like ViT-B/32, ViT-B/16, or a ResNet variant) determines the number of layers in the image encoder.
    Text Encoder: The text encoder is based on the Transformer architecture, similar to models like BERT or GPT. It processes the input text and converts it into a vector representation. The text encoder's size also varies based on the specific model variant.

The number of layers in CLIP, therefore, varies depending on the specific architecture used for both the image and text encoders. For instance, a CLIP model using a Vision Transformer as the image encoder will have a different layer count than one using a ResNet-based encoder.

The training of CLIP was innovative due to its large-scale dataset and contrastive learning approach, and its architecture is flexible, with the number of layers varying based on the chosen encoders.

## Comparision Resnet vs. CLIP

The layer count in a CLIP model varies depending on the architecture chosen for the image encoder. Let's delve into two common architectures used in CLIP: Vision Transformer (ViT) and ResNet.
Vision Transformer (ViT) as Image Encoder in CLIP:

    Architecture: The Vision Transformer (ViT) is a type of Transformer model adapted for image processing. Unlike traditional convolutional neural networks, ViT divides an image into fixed-size patches, linearizes these patches, and then processes them through a series of Transformer layers.
    Layer Count: The number of layers in a ViT model can vary. For instance, ViT-B/32 and ViT-B/16 are two variants of ViT used in CLIP, where "B" denotes the base model size, and the number (32 or 16) refers to the size of the patches each image is split into. These variants have different numbers of Transformer layers. Typically, a base Vision Transformer model (like ViT-B) might have around 12 Transformer layers.

ResNet as Image Encoder in CLIP:

    Architecture: ResNet, short for Residual Network, is a type of convolutional neural network (CNN) that is well-suited for image classification tasks. ResNet models are characterized by their use of residual connections, which help in training deeper networks by addressing the vanishing gradient problem.
    Layer Count: The layer count in ResNet varies based on the specific variant. For example, ResNet-50 has 50 layers, ResNet-101 has 101 layers, and so on. These layers are primarily convolutional layers, interleaved with batch normalization, activation functions, and residual connections.

Comparing ViT and ResNet in CLIP:

    Difference in Layers: The key difference lies in the nature and count of the layers. ViT uses Transformer layers which are fundamentally different from the convolutional layers used in ResNet.
    Impact on CLIP's Performance: The choice of the image encoder architecture affects how CLIP processes and understands images. ViT-based CLIP models might be better at capturing global information due to the self-attention mechanism in Transformers, while ResNet-based models might excel in recognizing patterns and features that benefit from convolutional layers.

The choice of image encoder in CLIP (ViT vs. ResNet) significantly impacts the model's layer structure, influencing how it processes images and performs on various tasks.


### ViT in CLIP vs. CNN in Resnet  

The fundamental difference between Vision Transformer (ViT) layers and the convolutional layers used in ResNet lies in their architectural design and the way they process image data. Here's a closer look at each:
Vision Transformer (ViT) Layers:

    Patch-Based Processing: ViT starts by dividing an image into fixed-size patches. Each patch is then flattened and linearly transformed into a vector. These vectors serve as the equivalent of "words" in a language model.
    Positional Encoding: Positional encodings are added to these patch embeddings to retain information about the relative or absolute position of the patches in the image.
    Transformer Architecture: The core of ViT is the Transformer architecture, originally designed for natural language processing. It uses self-attention mechanisms, allowing the model to weigh the importance of different patches relative to each other for a given task.
    Global Context: The self-attention mechanism enables the model to consider the entire image (global context) at each layer, as every patch is compared with every other patch.

Convolutional Layers in ResNet:

    Local Feature Processing: Convolutional layers process the image through a series of small, learnable filters. These filters move across the image (convolve) to extract local features such as edges, textures, or specific shapes.
    Hierarchical Structure: In ResNet, deeper layers in the network capture more complex features by building upon the simpler features extracted in earlier layers. This creates a hierarchy of feature representations.
    Residual Connections: ResNet introduces skip connections that allow the output of one layer to skip some layers and be added to the output of a deeper layer. This helps in alleviating the vanishing gradient problem in deep networks.
    Local Context: Convolutional layers focus on local context, meaning each filter processes a small part of the image at a time. The receptive field (area of input image seen by the filter) grows deeper in the network, but it's still based on local regions.

Key Differences:

    Processing Approach: ViT processes the image in patches and captures global relationships between them, while ResNet processes local features and builds up to a more global representation in a hierarchical manner.
    Attention vs. Convolution: ViT uses self-attention to weigh the importance of different parts of the image, regardless of their position. ResNet uses convolutional filters to extract local features and gradually combines these features in deeper layers.

In essence, ViT treats the image more like a sequence (similar to words in a sentence in NLP) and captures global dependencies through self-attention, whereas ResNet processes the image through localized filters, extracting hierarchical spatial features.

### ViT-B Layers Explained



The 12 Transformer layers in the Vision Transformer (ViT) model, specifically in the ViT-B (Base) variant, represent a series of identical layers stacked on top of each other, each performing the same set of operations but with different learned parameters. Let's break down the structure of a single Transformer layer and how it functions within ViT-B:
Structure of a Single Transformer Layer in ViT-B:

<img src="https://www.researchgate.net/publication/373573593/figure/fig2/AS:11431281185293391@1693578653909/ViT-B-32-model-structure.ppm" alt="ViT-B model architecture" />


Each of the 12 layers in ViT-B follows the standard architecture of a Transformer layer, which typically consists of the following components:

    Multi-Head Self-Attention (MSA):
        This module allows the model to weigh the importance of different patches of the image. Each 'head' in the multi-head setup focuses on different parts or aspects of the input.

    Skip Connection around MSA:
        After the MSA module, a skip connection (residual connection) is added. This means the output of the MSA module is added to its input, helping in mitigating the vanishing gradient problem in deep networks.

    Layer Normalization (LN):
        Before and/or after the MSA module, layer normalization is applied. It normalizes the inputs across the features, stabilizing the learning process.

    Feed-Forward Network (FFN):
        Each layer also contains a feed-forward network, which is a fully connected neural network applied to each position (patch) separately and identically. This network typically involves two linear transformations with a non-linear activation function in between.

    Skip Connection around FFN:
        Similar to the MSA module, the output of the FFN is added back to its input, forming another residual connection.

    Another Layer Normalization:
        Layer normalization may again be applied after the FFN.

Stacking in ViT-B:

    12 Identical Layers: In the ViT-B model, these layers are stacked sequentially, with each layer taking the output of the previous layer as its input. Despite being structurally identical, each layer learns different aspects of the data due to different learned weights.
    Global Representation: As the data passes through each layer, the model increasingly refines its understanding of the relationships between different parts of the image, building towards a global representation of the visual input.

The 12 Transformer layers in ViT-B are composed of a series of self-attention mechanisms, layer normalizations, and feed-forward networks, each contributing to the model's ability to understand and represent the input image through the lens of patch-based global context.

### ResNet50




ResNet-50, one of the popular variants of the Residual Network (ResNet) family, is renowned for its deep architecture specialized in image classification tasks. It comprises 50 layers, including convolutional layers, pooling layers, and fully connected layers, along with its characteristic residual connections. Let's break down the typical structure of layers in ResNet-50:
Overview of ResNet-50 Layers:

<img src="https://www.researchgate.net/publication/348871739/figure/fig2/AS:1020894147268608@1620411540259/ResNet-50-architecture.png" alt="ResNet50 model architecture" />

    Initial Convolution and Max Pooling Layer:
        First Layer: Begins with a single convolutional layer with a larger kernel size (7x7) and stride, followed by batch normalization and a ReLU activation function.
        Max Pooling: After the initial convolution, a max pooling layer is used to reduce the spatial dimensions of the output.

    Convolutional Blocks (Main Layers):
        Multiple Blocks: ResNet-50 consists of a series of four stages or blocks, each containing a different number of convolutional layers. These blocks form the core of the network.
        Convolutional Layers: Each block has 3x3 convolutional layers, but the number of filters and the stride may vary across different blocks.

    Residual Connections:
        Skip Connections: Each block includes skip connections or shortcuts that bypass one or more layers. These connections help prevent the vanishing gradient problem and allow deeper networks to be trained more effectively.
        Identity and Projection Shortcuts: ResNet-50 uses both identity shortcuts (which directly add the input to the output of the block) and projection shortcuts (which use 1x1 convolutions to match dimensions).

    Bottleneck Architecture:
        Efficiency: Each block in ResNet-50 uses a "bottleneck" design with 1x1, 3x3, and again 1x1 convolutions. The 1x1 layers are responsible for reducing and then increasing dimensions, allowing the 3x3 layer to have fewer input/output dimensions.

    Final Layers:
        Global Average Pooling: After the last convolutional block, a global average pooling layer is used, which helps in reducing the feature maps to a single vector per map.
        Fully Connected Layer: The network concludes with a fully connected layer that outputs the final classification predictions.

    Batch Normalization and Activation:
        Throughout the Network: Each convolutional layer in the blocks is followed by batch normalization and a ReLU activation function.

Sequential Flow in ResNet-50:

    The input image is first processed by the initial convolutional layer and max pooling.
    It then sequentially passes through the convolutional blocks, where each block refines the feature representations.
    Residual connections in each block facilitate effective training by allowing gradients to flow through the network without degradation.
    The network concludes with global average pooling and a fully connected layer for classification.

ResNet-50's architecture is characterized by its depth and the innovative use of residual connections in its convolutional blocks, enabling the efficient training of a deep network for complex image classification tasks.

## Resource

[ResNet50](https://www.researchgate.net/figure/ResNet-50-architecture_fig2_348871739)
[](https://www.researchgate.net/figure/ViT-B-32-model-structure_fig2_373573593)