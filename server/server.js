const PORT = process.env.PORT ?? 8000
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid')
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt'); //for hashing password
const jwt = require('jsonwebtoken'); // for generating token for user signup/login

app.use(cors());
app.use(express.json());

//get all daily goals
app.get('/daily-goals/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    // const userEmail = req.params.userEmail;  either above or this one is valid

    console.log(userEmail);

    try {
        const dailyGoalsList = await pool.query('SELECT * FROM daily_goals WHERE user_email = $1', [userEmail]);
        res.json(dailyGoalsList.rows)
    } catch (err) {
        console.error(err)
    }
})

//create new goal
app.post('/daily-goals', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try {
        const newTodo = await pool.query("INSERT INTO daily_goals (id, user_email, title, progress, date) VALUES ($1, $2,$3,$4, $5)", [id, user_email, title, progress, date])
        res.json(newTodo);
    } catch (err) {
        console.error(err);
    }
})

//Edit the daily goal
app.put('/daily-goals/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;

    try {
        const editTodo = await pool.query('UPDATE daily_goals SET user_email=$1 , title=$2, progress =$3 , date=$4 WHERE id = $5;', [user_email, title, progress, date, id]);
        res.json(editTodo)
    } catch (err) {
        console.error(err);
    }
})

//Delete the daily goal
app.delete('/daily-goals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await pool.query('DELETE FROM daily_goals WHERE id = $1;', [id]);
        res.json(deleteTodo)
    } catch (err) {
        console.error(err);
    }
})

//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signUp = await pool.query("INSERT INTO users (email, hashed_password) VALUES ($1, $2)", [email, hashedPassword]);

        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        res.json({ email, token });
    } catch (err) {
        console.error(err);
        if (err) {
            res.json({ detail: err.detail })
        }
    }
})

//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query("SELECT * FROM users WHERE email=$1", [email])

        if (!users.rows.length) return res.json({ detail: 'User does not exist!' });

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);

        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        if (success) {
            res.json({ email: users.rows[0].email, token })
        } else {
            res.json({ detail: 'Login failed' })
        }


    } catch (err) {
        console.error(err);
    }
})

app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
})