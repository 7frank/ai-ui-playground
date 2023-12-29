---
title: Artificial neural networks (ANN)
description: Overview of different neuronal networks
---

# (a?)nn

## Convolutional Neural Networks (CNNs):

    Use Case: Primarily for image processing and computer vision tasks. They are adept at handling spatial hierarchy in images, making them ideal for tasks like image classification, object detection, and image segmentation.
    Key Features: Use convolutional layers to extract features from images, pooling layers to reduce dimensionality, and fully connected layers for classification or regression.

https://pyimagesearch.com/2021/05/14/convolutional-neural-networks-cnns-and-layer-types/

Layer Types

There are many types of layers used to build Convolutional Neural Networks, but the ones you are most likely to encounter include:

### Convolutional (CONV)

### Activation (ACTor RELU, where we use the same or the actual activation function)

### Pooling (POOL)

### Fully connected (FC)

### Batch normalization (BN )

### Dropout (DO )

### Other

- embedding
  - turn a "something" into a number that is associated with a list of numbers that represent its properties (automatically trained in our case)
  - initially random
  - change through training

## Large Language Models (LLMs) like GPT-3, GPT-4:

- https://github.com/Hannibal046/Awesome-LLM

  Use Case: Specialized in processing and generating human language. They are used in applications such as text completion, content generation, conversational AI, and more.
  Key Features: Utilize transformer architecture, which allows them to handle long-range dependencies and context in text effectively.

### transformers

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

- [Attention is all you need (Transformer) - Model explanation (including math), Inference and Training](https://www.youtube.com/watch?v=bCz4OMemCcA&ab_channel=UmarJamil)

  - rnn

    - slow
    - vanishing or exploding gradients
      - video .. too much math
    - last token will not depend much on the first token (long text start still relevant to context of word at the end)
      - transformer solves problem

  - encoder
    - connected to decoder
  - embedding
    - turn a "something" into a number that is associated with a list of numbers that represent its properties (automatically trained in our case)
  - decoder

- [Coding a Transformer from scratch on PyTorch, with full explanation, training and inference.](https://www.youtube.com/watch?v=ISNdQcPhsts&ab_channel=UmarJamil)

- [Confused which Transformer Architecture to use? BERT, GPT-3, T5, Chat GPT? Encoder Decoder Explained](https://www.youtube.com/watch?v=wuj8Hao1TT4&ab_channel=DatafuseAnalytics)

### Vanilla Transformers:

    Original architecture designed primarily for translation tasks.
    Used in sequence-to-sequence tasks like language translation.

### BERT (Bidirectional Encoder Representations from Transformers):

    Designed for understanding the context of a word in a sentence (bidirectional context).
    Used in tasks like question answering, sentiment analysis, and language understanding.

### GPT (Generative Pretrained Transformer):

    Optimized for generating coherent and contextually relevant text.
    Used in text generation, creative writing, and as conversational agents.

### T5 (Text-to-Text Transfer Transformer):

    Framed all NLP tasks as a text-to-text problem.
    Used for a variety of tasks, including translation, summarization, question answering, and more.

### Vision Transformers (ViT):

    Adapts transformer architecture for image classification.
    Breaks images into patches and treats them similarly to words in a sentence.

### Multimodal Transformers:

    Designed to handle multiple types of data (e.g., text and images) simultaneously.
    Used in tasks that require understanding of both visual and textual data.

## Recurrent Neural Networks (RNNs):

    Use Case: Suited for sequential data such as time series, speech, and text. They are used in tasks like speech recognition, language modeling, and machine translation.
    Key Features: Have loops in their architecture to maintain information in 'memory' over time, allowing them to process sequences of data.

## Long Short-Term Memory Networks (LSTMs):

    Use Case: A more advanced form of RNNs, effective at learning long-range dependencies in sequential data. Commonly used in complex sequence modeling tasks like language translation and speech synthesis.
    Key Features: Include special units called memory cells that can maintain information in memory for long periods, addressing the vanishing gradient problem common in standard RNNs.

## Autoencoders:

    Use Case: Used for unsupervised learning tasks, such as dimensionality reduction, feature learning, and generative models. They are particularly useful in image denoising, anomaly detection, and data compression.
    Key Features: Consist of an encoder that compresses the input and a decoder that reconstructs the input from the compressed representation.

## Generative Adversarial Networks (GANs):

    Use Case: Widely used in generative tasks like image generation, image super-resolution, and style transfer. They have also found applications in data augmentation and synthetic data generation.
    Key Features: Comprise two parts – a generator that creates samples and a discriminator that distinguishes between generated and real samples, trained simultaneously in a competitive manner.

## Graph Neural Networks (GNNs):

    Use Case: Designed for data that is represented as graphs, such as social networks, molecule structures, and recommendation systems.
    Key Features: Capable of capturing the dependencies in graph structures, they update the representation of a node based on its neighbors.

## Transformer Networks:

    Use Case: Beyond their use in language models, transformers are also adapted for various tasks like image recognition (Vision Transformers, ViT) and multimodal tasks (combining text and images).
    Key Features: Relies on self-attention mechanisms to process sequences of data, whether it's text, image patches, or other forms of structured data.

## other

- Group method of data handling (GMDH)
- Probabilistic(PNN)
- time delay neural network (TDNN)
- deep stacking network (DSN)

and may more - [Types of artificial neural networks](https://en.wikipedia.org/wiki/Types_of_artificial_neural_networks)

## thesaurus

- parameters
- epoch
  - backpropagation & updating embeddings
- backpropagation
- feed forward
- bias term
