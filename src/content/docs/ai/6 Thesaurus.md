---
title: Thesaurus
---

### Core Concepts:


1. **Parameters:** The various elements that define the behavior and outcome of a neural network, including weights and hyperparameters.
   - **Weights:** Values within neural networks that are adjusted during training to optimize model performance.
   - **Hyperparameters:** High-level settings in machine learning models, like learning rate, that determine the network's structure and how it learns.
   - **Model Parameters:** Internal configuration variables that the model uses to make predictions.
   - **Configuration Settings:** Settings that define how a model operates, including both its structure and learning process.

2. **Epoch:** A complete cycle through the entire training dataset, used to improve the model's accuracy with each pass.
   - **Iteration:** A complete pass through the entire training dataset.
   - **Training Cycle:** A phase in the training process where the model processes the entire dataset once.
   - **Learning Iteration:** Each full pass through the dataset during training.
   - **Model Update Cycle:** The period during which the model updates its parameters based on the entire dataset.
   - **Backpropagation & Updating Embeddings**
     - **Gradient Descent:** An optimization algorithm for finding the minimum of a function, used to adjust network weights.
     - **Weight Adjustment:** The process of refining the weights in a neural network to minimize prediction error.

3. **Backpropagation:** A key algorithm in neural network training, responsible for calculating the gradient of the loss function and updating the weights accordingly.
   - **Error Backward Propagation:** A method for calculating the gradient of the loss function in a neural network.
   - **Gradient Descent Algorithm:** An optimization algorithm used in training neural networks.
   - **Learning Algorithm:** The method by which a neural network adjusts its weights based on the error of its outputs.
   - **Optimization Technique:** Strategies used to reduce errors and improve the model's predictions.

4. **Feed Forward:** A neural network architecture where connections between the nodes do not form a cycle, allowing for straightforward progression of data.
   - **Forward Propagation:** The process where inputs are passed through the network to generate outputs.
   - **Sequential Processing:** Linear progression of data through the network layers.
   - **Direct Signal Transmission:** A method in neural networks where input data moves in only one direction.
   - **Neural Activation Flow:** The process of transmitting signals from the input layer to the output layer in a neural network.

5. **Bias Term:** An additional parameter in neural networks used to adjust the output along with the weighted sum of the inputs, providing more flexibility to the model.
   - **Offset:** A parameter in neural networks that allows the activation function to be shifted.
   - **Intercept:** The value that represents the starting point of an activation function in a neuron.
   - **Bias Unit:** An extra input to neurons in Artificial Neural Networks that is always set to 1.
   - **Activation Threshold:** The level above which a neuron is activated and sends a signal to the next layer.

6. **Embedding:** A representation of categorical data as vectors in a high-dimensional space, allowing neural networks to process non-numeric data effectively.

         Turn a "something" (e.g a stream if text or part of an image) into a number. 
         The number is now a pointer to the actual thing, that is used internally by the model. 
         That number is also associated with a internal list of other numbers (the embedding)
         which represent its properties (often initially random, will change through training though)



   - **Feature Representation:** A method of converting raw data into a format more suitable for machine learning models.
   - **Vector Representation:** The representation of data in a multi-dimensional space.
   - **Numeric Encoding:** Transforming categorical data into a numerical format.
   - **Dense Representation:** A compact way of representing data in a lower-dimensional space.
   - **Turn a "something" into a number that is associated with a list of numbers that represent its properties (automatically trained in our case)**
     - **Feature Vectorization:** The process of converting raw features into a numerical format that can be processed by machine learning algorithms.
     - **Property Encoding:** Transforming attributes or properties of data into a numerical format.
   - **Initially Random**
     - **Random Initialization:** Starting the training process with randomly selected weights.
     - **Starting Parameters:** The initial state of the model's parameters before training.
   - **Change Through Training**
     - **Adaptive Representation:** The process by which the model's representation of data adjusts and improves during training.
     - **Learning Embeddings:** The process of refining the numerical representations of data features through training.

### Additional Concepts:

7. **Activation Function:** Functions applied to the output of each neuron, determining whether it should be activated or not based on the input it receives.
   - **Non-linearity:** Introduces non-linear properties to the network, allowing it to learn more complex patterns.
   - **Transfer Function:** The function used by neurons to decide whether to activate or not based on the input received.

8. **Loss Function:** A mathematical function used in neural networks to quantify the difference between the expected outcome and the outcomes produced by the model.
   - **Cost Function:** A measure of how far a model's predictions are from the actual values, guiding the training process.
   - **Objective Function:** The function that a machine learning model tries to minimize during training.

9. **Learning Rate:** A parameter that determines the step size at each iteration while moving toward a minimum of the loss function, crucial for the convergence of the training process.
   - **Step Size:** Determines the size of the steps taken during the optimization process.
   - **Update Rate:** Controls how quickly a model learns by adjusting how much the weights are updated during training.

10. **Regularization:** Techniques used in training neural networks to prevent overfitting, ensuring the model performs well on new, unseen data.
    - **Overfitting Prevention:** Techniques used to prevent a model from fitting too closely to the training data and losing generalization.
    - **Model Simplification:** Methods to reduce model complexity to improve performance and reduce overfitting.

11. **Convolutional Layer:** A key component in Convolutional Neural Networks (CNNs) used for feature detection and extraction, particularly useful in image and video processing.
    - **Feature Detector:** Identifies important features in the data, like edges in images.
    - **Kernel Application:** Involves applying a filter to the input data to extract important features.

12. **Recurrent Neural Networks (RNN):** A class of neural networks where connections between nodes form a directed graph along a temporal sequence, allowing them to exhibit temporal dynamic behavior.
    - **Sequential Data Processing:** Specialized in processing sequences of data, like text or time series.
    - **Temporal Dependency Modeling:** Capable of remembering previous inputs through internal state, useful for tasks involving sequence.

13. **Dropout:** A regularization technique where randomly selected neurons are ignored during training, helping to prevent the network from becoming too dependent on specific neurons.
    - **Overfitting Reduction Technique:** Temporarily removes units from the network to prevent co-adaptation and improve generalization.
    - **Random Deactivation:** Randomly disables neurons during the training process to prevent overfitting.

14. **Pooling Layer:** Often used in CNNs, these layers perform down-sampling operations along the spatial dimensions of the data, reducing its volume and computational load.
    - **Dimensionality Reduction:** Reduces the spatial size of the representation to reduce the number of parameters and computation in the network.
    - **Feature Pooling:** Combines similar features into one, reducing data size and complexity.

15. **Normalization:** A process in data preprocessing that involves adjusting the values in the dataset to a common scale, making it easier for the network to learn and converge.
    - **Data Scaling:** Adjusting the scale of the data to standardize inputs for the network.
    - **Standardization:** Modifying data to have a mean of zero and a standard deviation of one.


### Even more Terms:

If you want to learn more terms reated to AI, knock yourself out:

- [50 AI terms every beginner should know](https://www.telusinternational.com/insights/ai-data/article/50-beginner-ai-terms-you-should-know)

- [82 Artificial Intelligence terms you need to know today. (Updated) ](https://www.linkedin.com/pulse/25-artificial-intelligence-terms-you-need-know-today-jair-ribeiro/)


### still more

https://www.analyticsvidhya.com/blog/2024/01/generative-ai-terms/


- Agents: Software robots that can independently perceive and act within their environment to achieve goals.
- AGI (Artificial General Intelligence): A hypothetical AI capable of understanding and learning any intellectual task a human can.
- Alignment: Ensuring AI goals and values are compatible with human values.
- Attention: Mechanisms in neural networks that selectively focus on important parts of the input data.
- Autoencoders: Neural networks that learn compressed representations of data and then reconstruct the original data from those representations.
- Back Propagation: An algorithm that lets neural networks learn by adjusting their internal connections based on performance.
- Bias: Assumptions baked into AI models, often unintentionally, leading to unfair or discriminatory outcomes.
- BigGAN: A powerful type of GAN known for generating incredibly realistic and high-resolution images.
- Capsule Networks: Networks using capsules instead of neurons to capture spatial relationships and parts of objects.
- Chain of Thought: A proposed way for AI models to explain their reasoning process.
- Chatbot: Computer programs designed to simulate conversation with humans.
- ChatGPT: OpenAI’s large language model known for generating human-quality text and engaging in open-ended conversations.
- CLIP (Contrastive Language–Image Pretraining): An AI model that connects text and images.
- CNN (Convolutional Neural Network): Models specialized in processing data arranged in grids, like images.
- Conditional GAN (cGAN): A GAN that generates data based on specific additional information.
- CycleGAN: A model that translates images from one style to another without needing paired examples.
- Data Augmentation: Artificially increasing the amount and diversity of training data.
- DeepSpeed: A system for training large language models on distributed systems.
- Diffusion Models: A technique for generating data by gradually adding and then reversing noise.
- Double Descent: A phenomenon where increasing complexity of an AI model can initially hurt performance before improving it.
- Emergence/Emergent Behavior: Complex behavior arising from the interaction of simple rules in an AI system.
- Expert Systems: AI applications built with deep knowledge of a specific domain.
- Few-Shot Learning: Training models on a very small amount of data.
- Fine-tuning: Adapting a pre-trained AI model to a specific task.
- Forward Propagation: The process in neural networks where input data flows through the network layers.
- Foundation Model: A large and adaptable AI model serving as a base for developing various specialized applications.
- GAN (General Adversarial Network): AI where two models compete, one generating data and the other distinguishing it from real data.
- Generative AI: Machine learning models capable of autonomously creating new content.
- GPT (Generative Pretrained Transformer): A large language model developed by OpenAI.
- GPU (Graphics Processing Unit): Specialized microprocessors designed for parallel processing in AI.
- Gradient Descent: An optimization algorithm used to improve the performance of machine learning models.
- Hallucination: When AI models generate unrealistic or nonsensical content.
- Hidden Layer: Layers in neural networks that are not directly connected to the input or output.
- Hyperparameter Tuning: Adjusting settings in a machine learning model to achieve optimal performance.
- Instruction Tuning: Fine-tuning a pre-trained machine learning model with specific instructions or guidelines.
- Large Language Model (LLM): A machine learning model trained on a massive dataset of text and code.
- Latent Space: A low-dimensional representation of data learned by a machine learning model.
- Latent diffusion: A generative modeling technique using a diffusion process to add noise to a latent representation of data.
- LLamaIndex: An indexing method specifically designed for large language models.
- Langchain: A framework for chaining together different language models.
- LLMOps: Practices and tools involved in developing, deploying, and managing large language models.
- LoRA: A technique for adapting large language models to specific tasks with minimal fine-tuning.
- Mixture of Experts: A machine learning method that combines predictions of multiple, specialized submodels.
- Multimodal AI: Machine learning models that can process and generate data from different modalities.
- NeRF (Neural Radiance Fields): A novel method for creating 3D scenes from 2D images.
- Objective Function: A function maximized or minimized during the training of a machine learning model.
- One-Shot Learning: A machine learning approach that enables a model to learn from only one example per class.
- PEFT (Prompt Engineering Fine-Tuning): Enhancing large language models through tailored prompt engineering and fine-tuning.
- Pre-training: The initial learning phase of AI models.
- Prompt: The question or instruction that initiates an AI model’s task.
- ProGAN (Progressive Growing of GANs): A step-by-step approach to refine output in Generative Adversarial Networks.
- QLoRA: A refinement of LoRA using quantization to reduce the size and memory footprint of the adapter module.
- Regularization: Techniques to prevent models from overfitting.
- Reinforcement Learning (RL): An iterative learning paradigm where an agent interacts with an environment to maximize a reward signal.
- RLHF (RL from Human Feedback): Incorporating human expertise in RL through rewards, penalties, or demonstrations.
- Self-Supervised Learning (SSL): Generating its own labels from inherent patterns and structures.
- Sequence-to-Sequence Models (Seq2Seq): Models that transform a sequence of elements into another sequence.
- StyleGAN: A family of GANs specialized in generating highly realistic and customizable human faces.
- Singularity: A hypothetical point where AI surpasses human control and understanding.
- Text-to-Speech (TTS): Converting written text into spoken voice output.
- TPU (Tensor Processing Unit): A microprocessor designed for AI workloads.
- Transfer Learning: Leveraging knowledge from a pre-trained model to solve new problems.
- Transformer: A neural network architecture for processing sequential data.
- Variational Autoencoders (VAEs): A generative model using neural networks to encode and reconstruct data.
- Vector Databases: Databases designed to store and efficiently query high-dimensional vectors.
- XAI (Explainable AI): Making AI models more interpretable and understandable.
- Zero-shot Learning: A model's capability to handle tasks it has never been explicitly trained on.