import express from 'express'
import { UserModel } from '../models/User.js'

const app = express.Router()

export const getHome = app.get('/', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user) {
    res.render('home', { user, isAdmin })
  }
  else {
    res.render('home', { user: "", isAdmin: "" })
  }

})
export const getRegister = app.get('/register', async (req, res) => {
  res.render('register')
})
export const getLogin = app.get('/login', async (req, res) => {
  res.render('login')
})

export const postRegister = app.post('/register', async (req, res) => {
  const { name, departman, email, phone, password } = req.body
  UserModel.create({ name, departman, email, phone, password }).then(() => {
    res.redirect('/login?message=success')
  })
})
export const postLogin = app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.find({ email, password })
  if (user.length > 0) {
    req.session.email = user[0].email
    req.session.isAdmin = user[0].isAdmin
    res.redirect('/')
  }
  else {
    res.redirect('/register')
  }
})
export const logout = app.get('/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
export const getProfile = app.get('/profile', async (req, res) => {
  const email = req.session.email
  const isAdmin = req.session.isAdmin
  if (email) {
    const user = await UserModel.findOne({ email })
    res.render('user-update', { user, isAdmin })
  }
  else {
    res.redirect('/?message=no_user')
  }
})
export const postProfile = app.post('/profile', async (req, res) => {
  const { name, departman, email, phone, password } = req.body
  await UserModel.updateOne({ email }, { name, email, departman, phone, password })
  res.redirect('/profile?message=success_update')
})
export const getSalary = app.get('/salary', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user) {
    const users = await UserModel.find({})
    res.render('salary-table', { user, users, isAdmin:isAdmin ? isAdmin : '' })
  }
  else {
    res.redirect('/?message=no_user')
  }
})
export const getUpdateSalary = app.get('/salary-update', async (req, res) => {
  const { email } = req.query
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.findOne({ email })
    res.render("salary-update", { user, isAdmin, users })
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const postUpdateSalary = app.post('/salary-update', async (req, res) => {
  const { name, departman, email, phone, salary } = req.body
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.updateOne({ email }, { name, departman, email, phone, salary })
    res.redirect('/salary')
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const deleteSalary = app.get('/salary-delete', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  const { email } = req.query
  if (user && isAdmin) {
    await UserModel.deleteOne({ email })
    res.redirect('/salary')
  }
  else {
    res.redirect('/?message=no_user')
  }
})
export const getPersonal = app.get('/personal', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.find({})
    res.render('personal-table', { user, users, isAdmin })
  }
  else {
    res.redirect('/?message=no_user')
  }
})
export const getUpdatePersonal = app.get('/personal-update', async (req, res) => {
  const { email } = req.query
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.findOne({ email })
    res.render("personal-update", { user, isAdmin, users })
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const postUpdatePersonal = app.post('/personal-update', async (req, res) => {
  const { name, departman, email, phone } = req.body
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.updateOne({ email }, { name, departman, email, phone })
    res.redirect('/personal')
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const deletePersonal = app.get('/personal-delete', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  const { email } = req.query
  if (user && isAdmin) {
    await UserModel.deleteOne({ email })
    res.redirect('/personal')
  }
  else {
    res.redirect('/?message=no_user')
  }
})

export const getPerformans = app.get('/performans', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user) {
    const users = await UserModel.find({})
    res.render('performans-table', { user, users, isAdmin: isAdmin ? isAdmin : "" })
  }
  else {
    res.redirect('/?message=no_user')
  }
})
export const getUpdatePerformans = app.get('/performans-update', async (req, res) => {
  const { email } = req.query
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.findOne({ email })
    res.render("performans-update", { user, isAdmin, users })
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const postUpdatePerformans = app.post('/performans-update', async (req, res) => {
  const { name, departman, email, phone, salary } = req.body
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  if (user && isAdmin) {
    const users = await UserModel.updateOne({ email }, { name, departman, email, phone, salary })
    res.redirect('/performans')
  }
  else {
    res.redirect('/?message=no_user')
  }

})
export const deletePerformans = app.get('/performans-delete', async (req, res) => {
  const user = req.session.email
  const isAdmin = req.session.isAdmin
  const { email } = req.query
  if (user && isAdmin) {
    await UserModel.deleteOne({ email })
    res.redirect('/performans')
  }
  else {
    res.redirect('/?message=no_user')
  }
})