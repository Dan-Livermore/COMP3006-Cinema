import express from 'express';
import {Showing} from '../models/showingsModel.js';

const router = express.Router();

//CREATE SHOWING
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.filmID ||
      !request.body.startTime ||
      !request.body.seats ||
      !request.body.totalSeats ||
      !request.body.seatsRemaining 
    ) {
      return response.status(400).send({
        message:
          'Send all required fields: filmID, startTime, seats (Array), totalSeats, seatsRemaining.',
      });
    }
    const newShowing = {
      filmID: request.body.filmID,
      startTime: request.body.startTime,
      seats: request.body.seats,
      totalSeats: request.body.totalSeats,
      seatsRemaining: request.body.seatsRemaining,
    };

    const showing = await Showing.create(newShowing);
    console.log(showing);

    return response.status(201).send(showing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET ALL
router.get('/', async (request, response) => {
  try {
    const showings = await Showing.find({});

    return response.status(200).json({
      count: showings.length,
      data: showings,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET ONE
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const showing = await Showing.findById(id);

    return response.status(200).json(showing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//UPDATE
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.filmID ||
      !request.body.startTime ||
      !request.body.seats ||
      !request.body.totalSeats ||
      !request.body.seatsRemaining
    ) {
      return response.status(400).send({
        message:
          'Send all required fields: filmID, startTime, seats, totalSeats, seatsRemaining',
      });
    }

    const { id } = request.params;
    const result = await Showing.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Showing not found' });
    }
    return response.status(200).send({ message: 'Showing updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//DELETE
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Showing.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Showing not found' });
    }
    return response.status(200).send({ message: 'Showing deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;