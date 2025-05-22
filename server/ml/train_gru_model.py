# train_gru_model.py
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, GRU, Dense

# Simulated dataset (replace with your actual labeled data)
# X.shape = (samples, time_steps, features)
X = np.random.rand(500, 20, 10)  # 500 samples, 20 time steps, 10 sensor features
y_activity = tf.keras.utils.to_categorical(np.random.randint(0, 4, 500), num_classes=4)
y_emotion = tf.keras.utils.to_categorical(np.random.randint(0, 4, 500), num_classes=4)
y_sleep = tf.keras.utils.to_categorical(np.random.randint(0, 3, 500), num_classes=3)

# Model Architecture
input_layer = Input(shape=(20, 10))
x = GRU(64, return_sequences=False)(input_layer)
x = Dense(64, activation='relu')(x)

# Three output heads
activity_out = Dense(4, activation='softmax', name='activity')(x)
emotion_out = Dense(4, activation='softmax', name='emotion')(x)
sleep_out = Dense(3, activation='softmax', name='sleep')(x)

model = Model(inputs=input_layer, outputs=[activity_out, emotion_out, sleep_out])

model.compile(optimizer='adam',
              loss={'activity': 'categorical_crossentropy',
                    'emotion': 'categorical_crossentropy',
                    'sleep': 'categorical_crossentropy'},
              metrics=['accuracy'])

model.fit(X, [y_activity, y_emotion, y_sleep], epochs=20, batch_size=32)

# Save model
model.save("gru_model.h5")
print("Model trained and saved.")


# classify_gru.py
import sys
import json
import numpy as np
import tensorflow as tf

# Load the saved GRU model
model = tf.keras.models.load_model("gru_model.h5")

# Read JSON input from stdin
raw_input = sys.stdin.read()
sensor_data = json.loads(raw_input)

# Convert single sensor data to a simulated time sequence
input_vector = np.array([
    sensor_data['accX'], sensor_data['accY'], sensor_data['accZ'],
    sensor_data['gyroX'], sensor_data['gyroY'], sensor_data['gyroZ'],
    sensor_data['heartRate'], sensor_data['spo2'],
    sensor_data['bodyTemp'], sensor_data['gsr']
])

sequence = np.tile(input_vector, (20, 1))  # shape: (20, 10)
sequence = sequence.reshape(1, 20, 10)     # shape: (1, 20, 10)

# Run model prediction
activity_pred, emotion_pred, sleep_pred = model.predict(sequence)

# Create output JSON
result = {
    "activity": [
        {
            "time": "now",
            "walking": float(activity_pred[0][0]),
            "resting": float(activity_pred[0][1]),
            "falling": float(activity_pred[0][2]),
            "exercising": float(activity_pred[0][3])
        }
    ],
    "emotion": {
        "relaxed": float(emotion_pred[0][0]),
        "stressed": float(emotion_pred[0][1]),
        "motivated": float(emotion_pred[0][2]),
        "anxious": float(emotion_pred[0][3])
    },
    "sleep": {
        "deep": float(sleep_pred[0][0]),
        "light": float(sleep_pred[0][1]),
        "awake": float(sleep_pred[0][2])
    }
}

print(json.dumps(result))
