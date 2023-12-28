import express from 'express';
import {Booking} from '../models/bookingModel.js';
import {Showing} from '../models/showingsModel.js';

const router = express.Router();

//CREATE Booking
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.userID ||
      !request.body.showingID ||
      !request.body.seatNo
    ) {
      return response.status(400).send({
        message:
          'Send all required fields: userID, showingID, seatNo',
      });
    }
    const newBooking = {
      userID: request.body.userID,
      showingID: request.body.showingID,
      seatNo: request.body.seatNo,
    };

    const booking = await Booking.create(newBooking);
    console.log(booking);

    const splitSeat = newBooking.seatNo.split('');
    let row = '';
    if (splitSeat[0] === 'A') {
      row = 'row1';
    } else if (splitSeat[0] === 'B') {
      row = 'row2';
    } else if (splitSeat[0] === 'C') {
      row = 'row3';
    } else {
      row = 'row4';
    }

    const showing = await Showing.findOne({ _id: mongoose.Types.ObjectId(request.body.showingID) });
    if (!showing) {
      return response.status(404).send({ message: 'Showing not found' });
    }

    const showingRow = showing[row].split(',');
    showingRow[parseInt(splitSeat[1]) - 1] = 'Occupied';
    showing[row] = showingRow.join(',');

    await showing.save();

    return response.status(201).send(booking);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET ALL
router.get('/', async (request, response) => {
  try {
    const bookings = await Booking.find({});

    return response.status(200).json({
      count: bookings.length,
      data: bookings,
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

    const booking = await Booking.findById(id);

    return response.status(200).json(booking);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//UPDATE
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { userID, showingID, seatNo } = request.body;
    
        if (!userID || !showingID || !seatNo) {
          return response.status(400).send({
            message: 'Send all required fields: userID, showingID, seatNo',
          });
        }
    
        // Update the booking
        const updatedBooking = await Booking.findByIdAndUpdate(id, request.body, { new: true });
    
        if (!updatedBooking) {
          return response.status(404).json({ message: 'Booking not found' });
        }
    
        // Fetch the showing based on showingID
        const showing = await Showing.findById(showingID);
        if (!showing) {
          return response.status(404).json({ message: 'Showing not found' });
        }
    
        // Update the showing's seat status
        const splitSeat = seatNo.split('');
        let row = '';
        if (splitSeat[0] === 'A') {
          row = 'row1';
        } else if (splitSeat[0] === 'B') {
          row = 'row2';
        } else if (splitSeat[0] === 'C') {
          row = 'row3';
        } else {
          row = 'row4';
        }
    
        const showingRow = showing[row].split(',');
        showingRow[parseInt(splitSeat[1]) - 1] = 'Occupied';
        showing[row] = showingRow.join(',');
    
        // Save the updated showing
        await showing.save();
    
        return response.status(200).send({ message: 'Booking and Showing updated successfully' });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });

//DELETE
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Booking.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Booking not found' });
    }
    return response.status(200).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;