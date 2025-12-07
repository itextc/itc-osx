import React from 'react';
import PropTypes from 'prop-types';
import './Documentation.css';

function Documentation({ onClose }) {
  return (
    <div className="documentation-overlay">
      <div className="documentation-modal">
        <button className="doc-close-button" onClick={onClose} aria-label="Close documentation">
          ✕
        </button>
        
        <div className="doc-content">
          <h1 className="doc-title">Islāmic Text Copier</h1>
          <h2 className="doc-subtitle">Documentation</h2>

          <section className="doc-section">
            <h3>What is it?</h3>
            <p>
              The Islāmic Text Copier is a simple but very useful software that allows you to easily copy Arabic texts to your clipboard. This software was designed specifically for writing islāmic articles, and wanting to include Arabic blessings given in certain cases.
            </p>
          </section>

          <section className="doc-section">
            <h3>How to Use</h3>
            <h4>Copying texts</h4>
            <p>
              It's simple; click on an Arabic text on the screen, and it's copied right to your clipboard. To make things easier, you can also use hotkeys to copy them using <strong>Option</strong> (or <strong>Alt</strong> on Windows):
            </p>
            
            <ul className="hotkey-list">
              <li><kbd>Option + 1</kbd> → Copies <span className="arabic">ﷺ</span></li>
              <li><kbd>Option + 2</kbd> → Copies <span className="arabic">ﷻ</span></li>
              <li><kbd>Option + 3</kbd> → Copies <span className="arabic">سُبْحَانَهُ وَ تَعَالَى</span></li>
              <li><kbd>Option + 4</kbd> → Copies <span className="arabic">عَزَّ وَ جَلَّ</span></li>
              <li><kbd>Option + 5</kbd> → Copies <span className="arabic">رَضِيَ اللهُ عَنْهُ</span></li>
              <li><kbd>Option + 6</kbd> → Copies <span className="arabic">رَضِيَ اللهُ عَنْهَا</span></li>
              <li><kbd>Option + 7</kbd> → Copies <span className="arabic">رَحِمَهُ الله</span></li>
              <li><kbd>Option + 8</kbd> → Copies <span className="arabic">حَفِظَهُ الله</span></li>
              <li><kbd>Option + 9</kbd> → Copies <span className="arabic">عَلَيْهِ السَّلَام</span></li>
              <li><kbd>Option + 0</kbd> → Copies <span className="arabic">الحَمْدُ لله</span></li>
              <li><kbd>Option + -</kbd> → Copies <span className="arabic">جَزَاكَ اللهُ خَيْرًا</span></li>
              <li><kbd>Option + =</kbd> → Copies <span className="arabic">بَارَكَ اللهُ فِيكَ</span></li>
              <li><kbd>Option + [</kbd> → Copies <span className="arabic">السَّلَامُ عَلَيْكُم</span></li>
              <li><kbd>Option + ]</kbd> → Copies <span className="arabic">إِن شَاءَ الله</span></li>
            </ul>
          </section>

          <section className="doc-section">
            <h3>English Transliterations</h3>
            <table className="doc-table">
              <tbody>
                <tr><td className="arabic">ﷺ</td><td>Sallá Allāhu ʿAlayhī wa as-Salam</td></tr>
                <tr><td className="arabic">ﷻ</td><td>Jalla Jalāluhu</td></tr>
                <tr><td className="arabic">سُبْحَانَهُ وَ تَعَالَى</td><td>Subḥānahu wa Taʾālá</td></tr>
                <tr><td className="arabic">عَزَّ وَ جَلَّ</td><td>ʿAzza wa Jal</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهُ</td><td>Raḍī Allāhu ʿAnhu</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهَا</td><td>Raḍī Allāhu ʿAnhā</td></tr>
                <tr><td className="arabic">رَحِمَهُ الله</td><td>Raḥimahullāh</td></tr>
                <tr><td className="arabic">حَفِظَهُ الله</td><td>Ḥafiẓahullāh</td></tr>
                <tr><td className="arabic">عَلَيْهِ السَّلَام</td><td>ʿAlayhī as-Salām</td></tr>
                <tr><td className="arabic">الحَمْدُ لله</td><td>Alḥamdulillāh</td></tr>
                <tr><td className="arabic">جَزَاكَ اللهُ خَيْرًا</td><td>Jazāk Allāhu Khairan</td></tr>
                <tr><td className="arabic">بَارَكَ اللهُ فِيكَ</td><td>Bārik Allāhu Fīk</td></tr>
                <tr><td className="arabic">السَّلَامُ عَلَيْكُم</td><td>As-Salāmu ʿAlaykum</td></tr>
                <tr><td className="arabic">إِن شَاءَ الله</td><td>ʾIn shāʾ Allāh</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهُمَا</td><td>Raḍī Allāhu ʿAnhumā</td></tr>
                <tr><td className="arabic">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</td><td>Bismillāh ir-Raḥmān ir-Raḥīm</td></tr>
              </tbody>
            </table>
          </section>

          <section className="doc-section">
            <h3>English Translations</h3>
            <table className="doc-table">
              <tbody>
                <tr><td className="arabic">ﷺ</td><td>May Allāh's praise & salutations be upon him</td></tr>
                <tr><td className="arabic">ﷻ</td><td>Exalted is His Majesty</td></tr>
                <tr><td className="arabic">سُبْحَانَهُ وَ تَعَالَى</td><td>Glorious and Exalted is He</td></tr>
                <tr><td className="arabic">عَزَّ وَ جَلَّ</td><td>The Mighty and Majestic</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهُ</td><td>May Allāh be pleased with him</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهَا</td><td>May Allāh be pleased with her</td></tr>
                <tr><td className="arabic">رَحِمَهُ الله</td><td>May Allāh have mercy on him</td></tr>
                <tr><td className="arabic">حَفِظَهُ الله</td><td>May Allāh preserve him</td></tr>
                <tr><td className="arabic">عَلَيْهِ السَّلَام</td><td>Peace be upon him</td></tr>
                <tr><td className="arabic">الحَمْدُ لله</td><td>All praises and thanks are due to Allāh</td></tr>
                <tr><td className="arabic">جَزَاكَ اللهُ خَيْرًا</td><td>May Allāh give you good</td></tr>
                <tr><td className="arabic">بَارَكَ اللهُ فِيكَ</td><td>May Allāh bless you</td></tr>
                <tr><td className="arabic">السَّلَامُ عَلَيْكُم</td><td>Peace be upon you</td></tr>
                <tr><td className="arabic">إِن شَاءَ الله</td><td>If Allāh wills</td></tr>
                <tr><td className="arabic">رَضِيَ اللهُ عَنْهُمَا</td><td>May Allāh be pleased with them both</td></tr>
                <tr><td className="arabic">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</td><td>In the name of Allāh, the Most Gracious, the Most Merciful</td></tr>
              </tbody>
            </table>
          </section>

          <section className="doc-section doc-footer">
            <p>
              This should sum up everything you need to know about Islāmic Text Copier. If you write islāmic articles, this software is a high recommendation.
            </p>
            <p>
              Download it at: <a href="https://itc.nasiratif.net" target="_blank" rel="noopener noreferrer">itc.nasiratif.net</a>
            </p>
            <p className="doc-copyright">© Nāṣir ʿAṭif</p>
          </section>
        </div>
      </div>
    </div>
  );
}

Documentation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Documentation;
