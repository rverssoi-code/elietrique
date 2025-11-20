// Cloudflare Worker pour gérer les formulaires de contact - VERSION DEBUG
// Ce fichier doit être dans le dossier /functions/ à la racine de ton projet

export async function onRequestPost(context) {
  try {
    // Récupérer les données du formulaire
    const formData = await context.request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');

    // Validation basique
    if (!name || !email || !message) {
      return new Response('Veuillez remplir tous les champs obligatoires.', { 
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    // Préparer l'email
    const emailContent = {
      personalizations: [
        {
          to: [{ email: "info@elietrique.com" }],
        },
      ],
      from: {
        email: "noreply@elietrique.com",
        name: "Formulaire ElieTrique",
      },
      reply_to: {
        email: email,
        name: name,
      },
      subject: `Nouvelle demande de soumission - ${service || 'Non spécifié'}`,
      content: [
        {
          type: "text/html",
          value: `
            <h2>Nouvelle demande de soumission</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
            <p><strong>Type de service:</strong> ${service || 'Non spécifié'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Envoyé depuis le formulaire de contact sur elietrique.com</small></p>
          `,
        },
      ],
    };

    // Envoyer l'email via MailChannels
    const mailChannelsResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    });

    // VERSION DEBUG - Afficher les erreurs à l'écran
    if (!mailChannelsResponse.ok) {
      const errorText = await mailChannelsResponse.text();
      const errorStatus = mailChannelsResponse.status;
      
      // Retourner l'erreur complète pour qu'on puisse la voir
      return new Response(`
        <html>
        <head><title>Erreur Debug</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h2>Erreur MailChannels (Debug Mode)</h2>
          <p><strong>Status Code:</strong> ${errorStatus}</p>
          <p><strong>Message d'erreur:</strong></p>
          <pre style="background: #f4f4f4; padding: 15px; overflow-x: auto;">${errorText}</pre>
          <hr>
          <p><a href="/">Retour au site</a></p>
        </body>
        </html>
      `, { 
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Succès! Rediriger vers une page de confirmation
    return new Response(null, {
      status: 303,
      headers: {
        'Location': '/?success=true',
      },
    });

  } catch (error) {
    // Afficher l'erreur JavaScript à l'écran
    return new Response(`
      <html>
      <head><title>Erreur Debug</title></head>
      <body style="font-family: Arial; padding: 20px;">
        <h2>Erreur JavaScript (Debug Mode)</h2>
        <p><strong>Message:</strong> ${error.message}</p>
        <p><strong>Stack:</strong></p>
        <pre style="background: #f4f4f4; padding: 15px; overflow-x: auto;">${error.stack || 'N/A'}</pre>
        <hr>
        <p><a href="/">Retour au site</a></p>
      </body>
      </html>
    `, { 
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}