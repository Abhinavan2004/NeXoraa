// Custom commands for video chat app testing

// Command to join a room
Cypress.Commands.add('joinRoom', (username, roomName) => {
  cy.get('[data-testid="username-input"]').clear().type(username);
  cy.get('[data-testid="room-input"]').clear().type(roomName);
  cy.get('[data-testid="join-button"]').click();
  
  // Wait for room to load
  cy.get('[data-testid="video-container"]', { timeout: 10000 }).should('be.visible');
});

// Command to toggle camera
Cypress.Commands.add('toggleCamera', () => {
  cy.get('[data-testid="camera-toggle"]').click();
});

// Command to toggle microphone
Cypress.Commands.add('toggleMicrophone', () => {
  cy.get('[data-testid="mic-toggle"]').click();
});

// Command to check if user is in room
Cypress.Commands.add('shouldBeInRoom', (roomName) => {
  cy.url().should('include', `/room/${roomName}`);
  cy.get('[data-testid="room-title"]').should('contain', roomName);
});

// Command to mock WebRTC permissions
Cypress.Commands.add('mockMediaPermissions', () => {
  cy.window().then((win) => {
    // Mock getUserMedia for testing
    Object.defineProperty(win.navigator, 'mediaDevices', {
      value: {
        getUserMedia: cy.stub().resolves({
          getTracks: () => [
            { kind: 'video', stop: cy.stub() },
            { kind: 'audio', stop: cy.stub() }
          ]
        })
      }
    });
  });
});

// Command to wait for participant count
Cypress.Commands.add('waitForParticipants', (count) => {
  cy.get('[data-testid="participant-count"]').should('contain', count.toString());
});

// TypeScript type declarations removed from JavaScript file.
// If you need type declarations, place them in a separate .d.ts file.