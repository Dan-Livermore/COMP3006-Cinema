import express from 'express';
import {Film} from '../models/filmModel.js';

const router = express.Router();

//CREATE FILM
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.director ||
      !request.body.releaseDate ||
      !request.body.ageRating ||
      !request.body.runtime ||
      !request.body.description ||
      !request.body.poster 
    ) {
      return response.status(400).send({
        message:
          'Send all required fields: title, director, releaseDate, ageRating, runtime, description, poster',
      });
    }
    const newFilm = {
      title: request.body.title,
      director: request.body.director,
      releaseDate: request.body.releaseDate,
      ageRating: request.body.ageRating,
      runtime: request.body.runtime,
      description: request.body.description,
      poster: request.body.poster,
    };

    const film = await Film.create(newFilm);

    return response.status(201).send(film);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//GET ALL
router.get('/', async (request, response) => {
  try {
    const films = await Film.find({});

    return response.status(200).json({
      count: films.length,
      data: films,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//GET ONE
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const film = await Film.findById(id);

    return response.status(200).json(film);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//UPDATE
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.director ||
      !request.body.releaseDate ||
      !request.body.ageRating ||
      !request.body.runtime ||
      !request.body.description ||
      !request.body.poster 
    ) {
      return response.status(400).send({
        message:
          'Send all required fields: title, director, releaseDate, ageRating, runtime',
      });
    }

    const { id } = request.params;
    const result = await Film.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Film not found' });
    }
    return response.status(200).send({ message: 'Film updated successfully' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//DELETE
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Film.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Film not found' });
    }
    return response.status(200).send({ message: 'Film deleted successfully' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;