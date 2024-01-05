---
title: Generative Pretrained Transformer (GPT)

description: Overview of an LLM shown  with GPT2
---

GPT-2, developed by OpenAI, is a transformer-based model with a specific architecture. While I can't provide the exact number of parameters for each layer without directly inspecting the model's configuration, I can give you a general breakdown based on its typical architecture. The total number of parameters in a GPT-2 model depends on its specific variant (like GPT-2 Small, Medium, Large, or XL).
General Structure of GPT-2 Layers:

## Embedding Layer:

        The embedding layer turns input tokens into vectors. GPT-2 uses a shared embedding layer for both input tokens and position encodings.
        Parameters: The size of the embedding layer depends on the model's vocabulary size and the dimensionality of the embeddings.

## Transformer Blocks:

        Each transformer block contains several sub-layers:
            Multi-Head Attention Layer: Comprises several parallel attention mechanisms.
            Feed-Forward Neural Network: A simple neural network applied to each position separately and identically.
        Each of these layers has its own set of weights and biases.
        Parameters: The number of parameters depends on the size of the attention layers (number of heads, size of each head) and the size of the feed-forward network.

## Layer Normalization and Residual Connections:

        Applied within each transformer block.
        Parameters: Typically, layer normalization layers have parameters for scaling and bias.

## Output Layer:

        The final output layer that predicts the next token.
        Parameters: Often tied with the input embedding layer.

## Estimating Total Parameters:

For a specific example, let's consider GPT-2 Small, which has 117 million parameters:

    Embedding Size: Approximately 1.57 million parameters (assuming a 50,257 vocabulary size and a 768-dimensional embedding).
    Transformer Blocks: Each block has a significant number of parameters, mainly from the multi-head attention and feed-forward layers.
        GPT-2 Small has 12 layers, and if we evenly distribute the remaining parameters, each layer would have roughly 9.6 million parameters.

Total Parameters:

For the total sum:

    GPT-2 Small: ~117 million parameters.
    GPT-2 Medium: ~345 million parameters.
    GPT-2 Large: ~774 million parameters.
    GPT-2 XL: ~1.5 billion parameters.

### gpt3 parameters

- https://en.wikipedia.org/wiki/GPT-3

175B parameters
GPT-3 is a very large language model (the largest till date) with about 175B parameters. It is trained on about 45TB of text data from different datasets

### gpt4 parameters

- https://the-decoder.com/gpt-4-has-a-trillion-parameters/

  1.76 trillion parameters
  Further details on GPT-4's size and architecture have been leaked. The system is said to be based on eight models with 220 billion parameters each, for a total of about 1.76 trillion parameters, connected by a Mixture of Experts (MoE).

### llama paramters

- https://replicate.com/blog/all-the-llamas
