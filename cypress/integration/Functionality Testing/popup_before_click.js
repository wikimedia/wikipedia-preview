describe('Checks pop up is not visible before click or hover action', () => {
    it('Checks for pop up functionality for english.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Wildlife of the Central African Republic").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("ivory").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Bamingui-Bangoran National").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Chinko Project").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("50").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for bahasaIndonesia.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Gili Trawangan").click({force:true})

      // cy.get("a.wmf-wp-with-preview").contains("Lombok").trigger('mouseover').get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Gili Meno").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for hindi.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("विस्तार से जानिये कालिंजर दुर्ग के बारे में").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("मन्दिर").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("हुमांयू").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("अंकगणितीय").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for thai.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("เฉลิมชัย โฆษิตพิพัฒน์").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("พระมหาชนก").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("วัดร่องขุ่น").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("จังหวัดเชียงราย").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for spanish.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Nikola Tesla").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("motor de corriente alterna").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Edison").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Smiljan").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for french.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Conseil de sécurité des Nations unies").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("résolutions").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("droit de veto").get(".wp-popup").should('not.be.visible');
      
    });

    it('Checks for pop up functionality for arabic.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("أم كلثوم (مطربة)").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("القاهرة").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("مصر").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("محمد_عبد_الوهاب").get(".wp-popup").should('not.be.visible');

      
    });

  });
  