# VOLR 🚇

> [!IMPORTANT]  
> This version of Volr is no longer being maintained.
> I'm actively working on migrating the project to **Next.js** for improved performance, features and overall design.</br>
> Developing branch: [feature/nextjs-migration](https://github.com/pquline/Volr/tree/feature/nextjs-migration)</br>
> Preview:</br>
> <img src="https://github.com/user-attachments/assets/9214e53c-4930-4759-812a-8c31c0d2af7b" class="left" data-canonical-src="https://github.com/user-attachments/assets/9214e53c-4930-4759-812a-8c31c0d2af7b" width="300"/>


[Volr](https://volr.cc) is a web application that allows users to report and track potential 👮 dangers 👮 in public transportation systems.
The app currently supports transit networks in Paris, Marseille, and Rennes.

## ✨ Features
- Real-time reporting of mobile and stationary dangers in transit systems
- Support for multiple types of transit (metro, bus, tram, RER)
- Location-specific reporting (platforms, exits, correspondence corridors, vehicles)
- Contribution system with verification and modification capabilities
- Dark/Light mode support
- Mobile-friendly interface with pull-to-refresh functionality
- Automatic cleanup of outdated reports

## 🛠️ Technical Stack
- Frontend: HTML, JavaScript, Bootstrap 5
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: AWS Amplify

## 📋 Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

## 🚀 Installation
1. Clone the repository:
```bash
git clone https://github.com/pquline/Volr.git
cd Volr
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with your MongoDB connection string:
```
MONGO_URI=your_mongodb_connection_string
```
4. Run the application:
```bash
npm start
```
The application will be available at `http://localhost:3000`

## 💻 Development
To run the application in development mode with auto-reload:
```bash
npm run dev
```

## 🐳 Docker Support
The application includes Docker configuration for both development and production environments.
To run using Docker Compose:
```bash
docker-compose up
```

## 📊 Data Structure
The application uses two main MongoDB collections:

### Lines Collection
Stores transit line information:
```javascript
{
  city: String,
  order: String,
  name: String,
  type: String, // "subway", "bus", "tramway", "rer"
  stations: [String],
  terminus: [String]
}
```

### Entries Collection
Stores danger reports:
```javascript
{
  city: String,
  line: String,
  station: String,
  location: String,
  direction: String,
  state: String, // "danger" (stationary) or "warning" (mobile)
  edits: Number,
  last_edit: Date
}
```

## 🔌 API Endpoints
- `GET /api/lines`: Get all transit lines for a city
- `GET /api/lines/name/:lineName`: Get specific line details
- `GET /api/entries`: Get all danger reports for a city
- `POST /submit-form`: Submit a new danger report
- `PATCH /api/entries/:id`: Update an existing report
- `DELETE /api/entries/:id`: Delete a report

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazingFeature'`)
4. Push to the branch (`git push origin feature/amazingFeature`)
5. Open a Pull Request

## 👏 Credits
- Concept inspired by Check My Metro and RATS applications
- Transit data sourced from:
  - [RTM Marseille](https://www.rtm.fr/)
  - [Île-de-France Mobilités](https://data.iledefrance-mobilites.fr/pages/home/)
  - [STAR Rennes](https://data.explore.star.fr/)

## 📱 Preview
![Volr](https://i.ibb.co/mXSTrKw/app.png)
