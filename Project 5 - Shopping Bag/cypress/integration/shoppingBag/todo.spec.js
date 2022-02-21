describe('Teste Shopping Bag', () => {
  it('Visita a Home', () => {
    cy.visit('http://localhost:8080/#/')
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (0)')
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho')
  }),
  it('Clicka num produto na Home e o adiciona ao carrinho', () => {
    cy.visit('http://localhost:8080/#/')
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (0)')
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (1)')
  }),
  it('Remove um produto adicionado ao carrinho pela Home', () => {
    cy.visit('http://localhost:8080/#/')
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (0)')
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (1)')
    cy.get('#app > div.home > div > div.product.inBag > button').should('has.text', 'Remover do carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text', 'Carrinho (0)')
  }),
  it('Adiciona um item ao carrinho e recarrega a página', () => {
    cy.visit('http://localhost:8080/#/')
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (0)')
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)')
    cy.reload()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)')
  }),
  it('Visita o Carrinho', () => {
    cy.visit('http://localhost:8080/#/basket')
    cy.get('#app > div.basket > div > h4').should('be.visible').should('has.text','Sem itens no carrinho')
  }),
  it('Adiciona um produto ao Carrinho e o visualiza', () => {
    cy.visit('http://localhost:8080/#/basket')
    cy.get('#nav > a:nth-child(1)').should('be.visible').should('has.text','Início').click()
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)').click()
    cy.get('#app > div.basket > div > div.item > div.description').should('be.visible').should('has.text','Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
    cy.get('#app > div.basket > div > div.item > div.price > span.amount').should('be.visible').should('has.text','109.95')
    cy.get('#app > div.basket > div > div.grand-total').should('be.visible').should('has.text','Total do pedido: R$ 109.95')
  }),
  it('Adiciona um produto ao Carrinho, recarrega a página e o visualiza', () => {
    cy.visit('http://localhost:8080/#/basket')
    cy.get('#nav > a:nth-child(1)').should('be.visible').should('has.text','Início').click()
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)').click()
    cy.reload()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)')
    cy.get('#app > div.basket > div > div.item > div.description').should('be.visible').should('has.text','Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
    cy.get('#app > div.basket > div > div.item > div.price > span.amount').should('be.visible').should('has.text','109.95')
    cy.get('#app > div.basket > div > div.grand-total').should('be.visible').should('has.text','Total do pedido: R$ 109.95')
  }),
  it('Remove um produto adicionado pela página do Carrinho', () => {
    cy.visit('http://localhost:8080/#/basket')
    cy.get('#app > div.basket > div > h4').should('be.visible').should('has.text','Sem itens no carrinho')
    cy.get('#nav > a:nth-child(1)').should('be.visible').should('has.text','Início').click()
    cy.get('#app > div.home > div > div:nth-child(1) > button').should('has.text', 'Adicionar ao carrinho').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (1)').click()
    cy.get('#app > div.basket > div > div.item > div.remove').should('be.visible').should('has.text','Remover Produto').click()
    cy.get('#nav > a:nth-child(2)').should('be.visible').should('has.text','Carrinho (0)')
  })
})