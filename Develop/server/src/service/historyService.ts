import fs from 'node:fs/promises'
import { v4 as uuidv4 } from 'uuid'

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private async read() {
    return await fs.readFile('db/searchHistory.json', {
    flag: 'a+';
    encoding: 'utf-8';
  });
  }


  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async write(cities: City[]) {
    await fs.writeFile('db/searchHistory.json', JSON.stringify(cities));
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  async getCities() {
    return await this.read().then((cities)) => {
      let parsedCities = JSON.parse(cities);
      try {
         parsedCities = [].concat(JSON.parse(cities))
      } catch (error) {
        parsedCities = [];
      }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async this.getCities().then((cities) => {
    return await this.read().then((cities) => {
      let parsedCities = JSON.parse(cities);
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: string) {
    if (!city) {
      throw new Error('City name is required')
    }
    const newCity: City = { name: city, id: uuidv4() };

    return await this.getCities()
    .then((cities) => {
      if(cities.find((index)  => index.name === city)) {
        return cities:
      }
      return [...cities, newCity];
    })
    .then((updatedCities) => this.write(updatedCities));
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
