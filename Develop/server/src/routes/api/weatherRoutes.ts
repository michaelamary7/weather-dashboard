import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService  from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  console.info('${req.method} request received to get weather data for ${req.body.city}');
  const { cityName} = req.body;
  // TODO: save city to search history
  console.info('${cityName} received');
  if (cityName) {
    try {
      const weatherData = await WeatherService.getWeatherForCity(cityName);
      if (weatherData) {
        res.json(weatherData);
        await HistoryService.addCity(cityName);
      } else {
        res.status(404).json({ message: 'Error in retrieving weather data' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error in retrieving weather data' });
      }
    }

});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (error) {
    res.status(500).json({ message: 'Error in retrieving search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'Error in deleting city from search history' });
    }
    await HistoryService.deleteCity(req.params.id);
    res.json({ message: 'City deleted from search history' });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
