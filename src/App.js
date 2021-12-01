import logo from './logo.svg';
import React, { Component, useEffect } from 'react';
import axios from 'axios';
//import db from 'db.json';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label, Input} from 'reactstrap';


const data = [
        {id: 1, marca: "Volkswagen", modelo: "Gol", color: "azul", patente: "GCF 216"},
        {id: 2, marca: "Chevrolet", modelo: "Classic", color: "blanco", patente: "UIS 853"},
        {id: 3, marca: "Peugeot", modelo: "207", color: "rojo", patente: "LMA 623"},
        {id: 4, marca: "Ford", modelo: "Ecosport", color: "negro", patente: "POS 124"},
        {id: 5, marca: "Volkswagen", modelo: "Suran", color: "blanco", patente: "SPA 951"},
        {id: 6, marca: "Ford", modelo: "Ka", color: "azul", patente: "POA 753"}
]

class App extends React.Component{
  state={
    data: data,
    form:{
      id: '',
      marca:'',
      modelo: '',
      color: '',
      patente:'',
    },
    modalInsertar: false,
    modalEditar: false,
  }
  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }
/*
  getAutos(){
    this.setState({ loading: true }, () => {
      fetch("http://localhost:8000/autos")
        .then(res => res.json())
        .then(result =>
          this.setState({
            loading: false,
            alldata: result
          })
        )
        .catch(console.log);
    });
  }
*/
  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }


  insertar=()=>{
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;    
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id == registro.id){
        lista[contador].marca=dato.marca;
        lista[contador].modelo=dato.modelo;
        lista[contador].color=dato.color;
        lista[contador].patente=dato.patente;
      }
      contador++;
    })
    this.setState({data: lista, modalEditar: false});
  }

  eliminar=(dato)=>{
    var opcion = window.confirm("¿Quieres eliminar el registro" + dato.id + " ?");
    if(opcion){
      var contador=0;
      var lista = this.state.data;
      lista.map((registro) =>{
        if(registro.id == dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data: lista});
    }
  }


  render() {
    return (
     <>
     <Container>
     <br />
     <Button color="success" onClick={() => this.mostrarModalInsertar()}>Ingresar un nuevo auto</Button>
    <br/>
    <Table>
      <thead><tr><th>ID</th>
      <th>Marca</th>
      <th>Modelo</th>
      <th>Color</th>
      <th>Patente</th>
      <th>Acciones</th></tr></thead>
      <tbody>
        {this.state.data.map((elemento)=>(
        <tr>
          <td>{elemento.id}</td>
          <td>{elemento.marca}</td>
          <td>{elemento.modelo}</td>
          <td>{elemento.color}</td>
          <td>{elemento.patente}</td>
          <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
          <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
        </tr>
        ))}
      </tbody>
    </Table>


     </Container>
     <Modal isOpen={this.state.modalInsertar}>
       <ModalHeader>
       <div>
         <h1>Insertar Registro</h1>
       </div>
       </ModalHeader>
       <ModalBody>
         <FormGroup>
           <Label>ID:</Label>
           <Input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
         </FormGroup>
       <FormGroup>
           <Label>Marca:</Label>
           <Input className="form-control" name="marca" type="text" onChange={this.handleChange}/>
         </FormGroup>
         <FormGroup>
           <Label>Modelo:</Label>
           <Input className="form-control" name="modelo" type="text" onChange={this.handleChange}/>
         </FormGroup>
         <FormGroup>
           <Label>Color:</Label>
           <Input className="form-control" name="color" type="text" onChange={this.handleChange}/>
         </FormGroup>
         <FormGroup>
           <Label>Patente:</Label>
           <Input className="form-control" name="patente" type="text" onChange={this.handleChange}/>
         </FormGroup>
       </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
      </ModalFooter>

     </Modal>

     <Modal isOpen={this.state.modalEditar}>
       <ModalHeader>
       <div>
         <h1>Editar Registro</h1>
       </div>
       </ModalHeader>
       <ModalBody>
         <FormGroup>
           <Label>ID:</Label>
           <Input className="form-control" readOnly type="text" onChange={this.handleChange} value={this.state.form.id}/>
         </FormGroup>
       <FormGroup>
           <Label>Marca:</Label>
           <Input className="form-control" name="marca" type="text" onChange={this.handleChange} value={this.state.form.marca}/>
         </FormGroup>
         <FormGroup>
           <Label>Modelo:</Label>
           <Input className="form-control" name="modelo" type="text" onChange={this.handleChange} value={this.state.form.modelo}/>
         </FormGroup>
         <FormGroup>
           <Label>Color:</Label>
           <Input className="form-control" name="color" type="text" onChange={this.handleChange} value={this.state.form.color}/>
         </FormGroup>
         <FormGroup>
           <Label>Patente:</Label>
           <Input className="form-control" name="patente" type="text" onChange={this.handleChange} value={this.state.form.patente}/>
         </FormGroup>
       </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={()=>this.editar(this.state.form)} >Editar</Button>
        <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
      </ModalFooter>

     </Modal>
    </>
    );
  }
}

export default App;
