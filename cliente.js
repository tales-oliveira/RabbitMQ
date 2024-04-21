#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const readline = require('readline');

// Configura a interface readline
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Função para enviar mensagem ao servidor.
function enviaMensagem(queue, channel){
	var msg = 'TESTE MSG CLIENTE';

	channel.sendToQueue(queue, Buffer.from(msg));
	console.log("Enviado %s", msg);
}

// Função para alterar arquivo
function alteraArquivo(){
	var queue = 'arquivo';
	var msg = 'TESTE ARQUIVO';

	channel.assertQueue(queue, {
		durable: false
	});

	channel.sendToQueue(queue, Buffer.from(msg));
		console.log("Enviado %s", msg);
}

// Realizar o cálculo de uma função
function calculaFuncao(){
	var queue = 'funcao';
	var msg = 'TESTE FUNCAO';

	channel.assertQueue(queue, {
		durable: false
	});

	channel.sendToQueue(queue, Buffer.from(msg));
		console.log("Enviado %s", msg);
}

// Processar escolhas do menu
function processarOpcao(opcao) {
	switch(opcao) {
		case '1':
			enviaMensagem();
			break;
		case '2':
			alteraArquivo();
			break;
		case '3':
			calculaFuncao();
			break;
		case '4':
			console.log("Saindo...");
			rl.close();
		//	connection.close();
			process.exit(0); // Encerra o processo
			break;
		default:
			console.log("Opção inválida");
	}
}

// Função para iniciar o menu
function menu(queue, channel){
	rl.question(
		'\n ------------------ \n' + 
		'       RabbitMQ         ' +
		'\n ------------------ \n' + 
		'\nEscolha uma opção:\n' + 
		'1. Enviar mensagem\n' + 
		'2. Função 2\n' + 
		'3. Função 3\n' + 
		'4. Encerrar\n', 
		(answer) => {
		    switch (answer.trim()) {
		        case '1':
		            enviaMensagem(queue, channel);
		            break;
		        case '2':
		            console.log('\nExecutando Função 2\n');
		            break;
		        case '3':
		            console.log('\nExecutando Função 3\n');
		            break;
		        case '4':
		        	rl.close();
		            //connection.close();
		            process.exit(0);
		            break;
		        default:
		            console.log('Opção inválida');
		    }
		    menu(); // Inicia novamente o menu
    	}
    );
}


amqp.connect('amqp://localhost', function(error0, connection) {
	if (error0){
		throw error0;
	}
	
	connection.createChannel(function(error1, channel) {
		if (error1) {
			throw error1;
		}

		var queue = 'mensagem';

		channel.assertQueue(queue, {
			durable: false
		});



		menu(queue, channel);
	});
});



