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
   - **Bias Unit:** An extra input to neurons in artificial neural networks that is always set to 1.
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
