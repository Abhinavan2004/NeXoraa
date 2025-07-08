describe('HomePage Advanced Tests', () => {
  // Option 1: Login before each test
  beforeEach(() => {
    // Method 1a: Direct login via UI
    cy.visit('http://localhost:5173/login') // or wherever your login page is
    // cy.get('[data-testid="email"]').type('bomle@gmail.com') // adjust selectors
    // cy.get('[data-testid="password"]').type('bomle2004')
    // cy.get('[data-testid="login-button"]').click()
    
    // // Wait for redirect to homepage
    // cy.url().should('include', '/') // or '/home' or '/dashboard'
    
    // OR Method 1b: Login via API call (faster)
    cy.request({
      method: 'POST',
      url: 'http://localhost:5173/api/auth/login',
      body: {
        email: 'bomle@gmail.com',
        password: 'bomle2004'
      }
    }).then((response) => {
      // Store token in localStorage or cookies
      window.localStorage.setItem('authToken', response.body.token)
      // or cy.setCookie('authToken', response.body.token)
    })
    // cy.visit('http://localhost:5173')
  })

  describe('Friend Management', () => {
    it('should display friend cards with all required information', () => {
      cy.intercept('GET', '**/user/myFriends', { fixture: 'friends-list.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      
      cy.wait('@getFriends')
      
      // Verify friend cards are displayed with proper information
      cy.get('.grid').should('exist')
      // If you add data-testid to FriendCard component, uncomment below:
      // cy.get('[data-testid="friend-card"]').should('have.length', 2)
    })

    it('should navigate to friend requests page', () => {
      cy.get('a').contains('Friend Requests').click()
      cy.url().should('include', '/notifications')
    })
  })

  describe('Recommended Users Functionality', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/user/myFriends', { fixture: 'empty-friends.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
    })

    it('should display user profile information correctly', () => {
      cy.wait('@getRecommendedUsers')
      
      // Check first user card
      cy.get('.card').first().within(() => {
        // Check avatar
        cy.get('.avatar img').should('have.attr', 'src').and('include', 'avatar.iran.liara.run')
        
        // Check user name
        cy.get('h3').should('contain', 'Maria Garcia')
        
        // Check location
        cy.contains('Madrid').should('be.visible')
        
        // Check bio
        cy.contains('Native Spanish speaker').should('be.visible')
        
        // Check language badges
        cy.get('.badge-outline').should('contain', 'Spanish')
        cy.get('.badge-primary').should('contain', 'English')
        
        // Check send friend request button
        cy.get('button').should('contain', 'Send Friend Request')
        cy.get('button').should('not.be.disabled')
      })
    })

    it('should handle friend request sending flow', () => {
      cy.intercept('POST', '**/user/sendFriendRequests/user1', { 
        statusCode: 200, 
        body: { success: true, message: 'Friend request sent' } 
      }).as('sendFriendRequest')
      
      cy.wait('@getRecommendedUsers')
      
      // Find Maria Garcia's card and send friend request
      cy.contains('Maria Garcia').parents('.card').within(() => {
        cy.get('button').contains('Send Friend Request').click()
      })
      
      cy.wait('@sendFriendRequest')
      
      // Button should change to "Request Sent" and be disabled
      cy.contains('Maria Garcia').parents('.card').within(() => {
        cy.get('button').should('contain', 'Request Sent')
        cy.get('button').should('have.class', 'btn-disabled')
      })
    })

    it('should show already sent requests as disabled', () => {
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'outgoing-requests.json' }).as('getOutgoingRequests')
      
      cy.wait(['@getRecommendedUsers', '@getOutgoingRequests'])
      
      // Maria Garcia should have disabled button since request was already sent
      cy.contains('Maria Garcia').parents('.card').within(() => {
        cy.get('button').should('contain', 'Request Sent')
        cy.get('button').should('have.class', 'btn-disabled')
      })
    })

    it('should handle multiple friend requests', () => {
      cy.intercept('POST', '**/user/sendFriendRequests/*', { 
        statusCode: 200, 
        body: { success: true } 
      }).as('sendFriendRequest')
      
      cy.wait('@getRecommendedUsers')
      
      // Send requests to multiple users
      cy.contains('Pierre Dubois').parents('.card').within(() => {
        cy.get('button').contains('Send Friend Request').click()
      })
      
      cy.wait('@sendFriendRequest')
      
      cy.contains('Anna Mueller').parents('.card').within(() => {
        cy.get('button').contains('Send Friend Request').click()
      })
      
      cy.wait('@sendFriendRequest')
      
      // Both buttons should be disabled now
      cy.contains('Pierre Dubois').parents('.card').within(() => {
        cy.get('button').should('have.class', 'btn-disabled')
      })
      
      cy.contains('Anna Mueller').parents('.card').within(() => {
        cy.get('button').should('have.class', 'btn-disabled')
      })
    })
  })

  describe('Loading States and Error Handling', () => {
    it('should show loading spinner while fetching data', () => {
      // Intercept with delay to see loading state
      cy.intercept('GET', '**/user/myFriends', { 
        delay: 1000, 
        fixture: 'empty-friends.json' 
      }).as('getFriends')
      cy.intercept('GET', '**/user/users', { 
        delay: 1000, 
        fixture: 'recommended-users.json' 
      }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { 
        delay: 1000, 
        fixture: 'empty-requests.json' 
      }).as('getOutgoingRequests')
      
      // Should show loading spinners
      cy.get('.loading-spinner').should('be.visible')
      
      cy.wait(['@getFriends', '@getRecommendedUsers', '@getOutgoingRequests'])
      
      // Loading spinners should disappear
      cy.get('.loading-spinner').should('not.exist')
    })

    it('should handle network errors gracefully', () => {
      cy.intercept('GET', '**/user/myFriends', { statusCode: 500 }).as('getFriendsError')
      cy.intercept('GET', '**/user/users', { statusCode: 500 }).as('getRecommendedUsersError')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { statusCode: 500 }).as('getOutgoingRequestsError')
      
      // Page should still render the main structure
      cy.contains('Your Friends').should('be.visible')
      cy.contains('Meet New Partners').should('be.visible')
    })

    it('should handle failed friend request', () => {
      cy.intercept('GET', '**/user/myFriends', { fixture: 'empty-friends.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      cy.intercept('POST', '**/user/sendFriendRequests/*', { 
        statusCode: 400, 
        body: { error: 'Request failed' } 
      }).as('sendFriendRequestError')
      
      cy.wait('@getRecommendedUsers')
      
      cy.get('button').contains('Send Friend Request').first().click()
      cy.wait('@sendFriendRequestError')
      
      // Button should remain enabled on error
      cy.get('button').contains('Send Friend Request').should('exist')
    })
  })

  describe('Responsive Design', () => {
    it('should adapt to tablet view', () => {
      cy.viewport('ipad-2')
      cy.intercept('GET', '**/user/myFriends', { fixture: 'friends-list.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      
      cy.wait(['@getFriends', '@getRecommendedUsers'])
      
      // Check responsive grid classes
      cy.get('.grid').should('be.visible')
      cy.contains('Your Friends').should('be.visible')
    })

    it('should adapt to mobile view', () => {
      cy.viewport('iphone-x')
      cy.intercept('GET', '**/user/myFriends', { fixture: 'friends-list.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      
      cy.wait(['@getFriends', '@getRecommendedUsers'])
      
      // Check mobile layout
      cy.get('.container').should('be.visible')
      cy.contains('Your Friends').should('be.visible')
      cy.get('a').contains('Friend Requests').should('be.visible')
    })
  })

  describe('Accessibility', () => {
    it('should have proper image alt texts', () => {
      cy.intercept('GET', '**/user/myFriends', { fixture: 'empty-friends.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      
      cy.wait('@getRecommendedUsers')
      
      // Check if avatar images have alt text
      cy.get('.avatar img').first().should('have.attr', 'alt')
    })

    it('should have proper button labels', () => {
      cy.intercept('GET', '**/user/myFriends', { fixture: 'empty-friends.json' }).as('getFriends')
      cy.intercept('GET', '**/user/users', { fixture: 'recommended-users.json' }).as('getRecommendedUsers')
      cy.intercept('GET', '**/user/outgoingFriendRequests', { fixture: 'empty-requests.json' }).as('getOutgoingRequests')
      
      cy.wait('@getRecommendedUsers')
      
      // Check button accessibility
      cy.get('button').contains('Send Friend Request').should('be.visible')
      cy.get('a').contains('Friend Requests').should('be.visible')
    })
  })
})