# Weather App CRUD

A full-stack weather application that allows users to manage and track weather information for multiple locations with complete CRUD (Create, Read, Update, Delete) operations.

## 📋 Overview

This project is a comprehensive weather application built with a modern tech stack, featuring a Python backend and JavaScript frontend. Users can add locations, view real-time weather data, update their saved locations, and remove them as needed.

## ✨ Features

- **Create**: Add new locations to track weather
- **Read**: View current weather information for saved locations
- **Update**: Modify saved location details
- **Delete**: Remove locations from your tracking list
- **Real-time Weather Data**: Get up-to-date weather information using weather API integration
- **User-friendly Interface**: Clean and intuitive UI for seamless interaction

## 🛠️ Tech Stack

### Backend
- **Python** (36.8%)
- **Mako** (2.6%) - Templating engine
- RESTful API architecture
- Database integration for persistent storage

### Frontend
- **JavaScript** (59.2%)
- **HTML** (1.3%)
- **CSS** (0.1%)
- Modern, responsive design

## 📁 Project Structure

```
Weather-app-crud/
├── Backend/           # Python backend application
│   ├── API endpoints
│   ├── Database models
│   └── Business logic
├── Frontend/          # JavaScript frontend application
│   ├── UI components
│   ├── API integration
│   └── Styling
└── LICENSE           # MIT License
```

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm (if applicable for frontend dependencies)
- A weather API key (e.g., OpenWeatherMap, WeatherAPI, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Habibullah-R/Weather-app-crud.git
   cd Weather-app-crud
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Configure environment variables
   # Create a .env file with your API keys and database configuration
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   # Install dependencies if needed
   npm install  # or yarn install
   ```

4. **Configure API Keys**
   - Obtain an API key from your chosen weather service provider
   - Add the API key to your environment variables or configuration file

5. **Run the Application**
   
   **Backend:**
   ```bash
   cd Backend
   python app.py  # or your main application file
   ```
   
   **Frontend:**
   ```bash
   cd Frontend
   # Open index.html in browser or use a local server
   # If using a development server:
   npm start
   ```

## 🔧 Configuration

Create a configuration file or `.env` file in the Backend directory with the following variables:

```
WEATHER_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
PORT=5000
DEBUG=True
```

## 📖 API Endpoints

The backend provides the following RESTful endpoints:

- `GET /api/v1/user_data/data` - Retrieve all saved locations
- `POST /api/v1/user_data/data` - Add a new location
- `PATCH /api/v1/user_data/data:data_uid` - Update a specific location
- `DELETE /api/v1/user_data/data/:data_uid` - Delete a specific location

## 💡 Usage

1. **Add a Location**: Enter a city name and save it to your list
2. **View Weather**: See real-time weather data for all saved locations
3. **Update Location**: Modify location details or preferences
4. **Delete Location**: Remove locations you no longer want to track

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [Weather API Provider Name]
- Inspiration from various weather application projects
- Open source community for tools and libraries

## 📧 Contact

Habibullah - [@Habibullah-R](https://github.com/Habibullah-R)

Project Link: [https://github.com/Habibullah-R/Weather-app-crud](https://github.com/Habibullah-R/Weather-app-crud)

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Multi-day weather forecasts
- [ ] Weather alerts and notifications
- [ ] Data visualization with charts and graphs
- [ ] Mobile responsive design improvements
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
