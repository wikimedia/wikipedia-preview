describe('Popup Functionality testing', () => {
    it('Checks for pop up functionality for english.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Wildlife of the Central African Republic").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("ivory").get(".wp-popup").should('not.be.visible');
      cy.get("span.wmf-wp-with-preview").contains("ivory").click().get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Bamingui-Bangoran National").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Chinko Project").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("50").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for bahasaIndonesia.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Gili Trawangan").click({force:true})

      // cy.get("a.wmf-wp-with-preview").contains("Lombok").trigger('mouseover').get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Gili Meno").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for hindi.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("विस्तार से जानिये कालिंजर दुर्ग के बारे में").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("मन्दिर").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("हुमांयू").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("अंकगणितीय").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for thai.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("เฉลิมชัย โฆษิตพิพัฒน์").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("พระมหาชนก").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("วัดร่องขุ่น").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("จังหวัดเชียงราย").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for spanish.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Nikola Tesla").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("motor de corriente alterna").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Edison").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("Smiljan").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for french.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("Conseil de sécurité des Nations unies").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("résolutions").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("droit de veto").click({force:true}).get(".wp-popup").should('be.visible');
      
    });

    it('Checks for pop up functionality for arabic.html page', () => {
      cy.visit("localhost:8080")
      cy.contains("أم كلثوم (مطربة)").click({force:true})

      cy.get("span.wmf-wp-with-preview").contains("القاهرة").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("مصر").click({force:true}).get(".wp-popup").should('be.visible');
      cy.get("span.wmf-wp-with-preview").contains("محمد_عبد_الوهاب").click({force:true}).get(".wp-popup").should('be.visible');

      
    });

  });
  