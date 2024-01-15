---
title: Frameworks
---


## Base Libraries

- NumPy
- PyTorch
- Tensorflow

## Frameworks that lay on top of the base Libraries

- Keras: A high-level API that simplifies neural network development, running on top of TensorFlow. It's known for its user-friendliness and modularity.

- JAX: Developed by Google, JAX extends NumPy to offer automatic differentiation and GPU/TPU support, focusing on high-performance machine learning research.

- Chainer: A flexible framework for neural networks, offering a straightforward approach to define and manipulate models, especially known for its dynamic computation graphs.

- Gluon: Created by AWS and Microsoft, Gluon provides a clear, concise API for building machine learning models and is integrated with the MXNet library.

- fast.ai
- NeoGrad

## Comparing NeoGrad and fast.ai:

- Target Audience: NeoGrad is designed for educational purposes, focusing on simplicity and readability to help users understand deep learning concepts. In contrast, fast.ai targets a broader audience, including beginners and experienced practitioners, with a focus on enabling fast and efficient deep learning development.

- Complexity and Features: NeoGrad simplifies core concepts like automatic differentiation and is built from scratch using Python and NumPy. Fast.ai, on the other hand, provides a more comprehensive set of high-level functionalities, built on top of PyTorch, facilitating quick model building and experimentation.

- API and Usability: NeoGrad offers a PyTorch-like API, aiding in the transition between the two for users familiar with PyTorch. Fast.ai extends PyTorch's capabilities with its own high-level API, making it more user-friendly and abstracting many complex tasks.

- Customization and Flexibility: Both frameworks allow customization like creating layers, optimizers, and loss functions, but fast.ai typically offers more advanced features and integrations due to its maturity and larger user base.

- Educational Focus: NeoGrad emphasizes educational aspects, making it ideal for learners who want to understand the mechanics of neural networks. Fast.ai, while also educational, leans more towards practical application and rapid development.

Overall, NeoGrad is more suited for educational purposes, especially for those seeking to grasp fundamental concepts in a simpler setting, whereas fast.ai is a more robust tool for practical deep learning applications.