// import path from 'path';
// import fs from 'fs/promises';
// import connectDB from '@/lib/connectDB';
 

// export async function GET(request: { url: string | URL }) {
//     try {
//         // Conectar a la base de datos
//         const connection = await connectDB();

//         // Definir la ruta al archivo JSON en la carpeta public
//         const jsonFilePath = path.join(process.cwd(), 'public', 'data.json');

//         // Leer el archivo JSON
//         const fileContent = await fs.readFile(jsonFilePath, 'utf8');
//         const data = JSON.parse(fileContent);

//         // Insertar los datos sin filtrarlos en MongoDB (colección genérica)
//         const db = connection.connection.db; // Acceso directo a la base de datos
//         const collection = db?.collection('ingredients'); // Especifica el nombre de la colección
//         const insertResult = await collection?.insertMany(data);

//         return new Response(JSON.stringify(insertResult), {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (e) {
//         console.error(e);
//         return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }