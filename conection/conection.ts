import {
    BLEPrinter,
    IBLEPrinterIdentity
} from '@intechnity/react-native-thermal-printer';

export class PrinterService {

    private printers:IBLEPrinterIdentity[];
    private printer: IBLEPrinterIdentity;
    
  async init(): Promise<void> {
    try {
      await BLEPrinter.init();
      console.log("conexão iniciada")
    } catch (error) {
      console.error('Falha ao inicializar o serviço de impressão:', error);
      throw new Error('Não foi possível iniciar o serviço de impressão.');
    }
  }


  async lookingForPrinter(): Promise<IBLEPrinterIdentity[]> {
    try {
 
      const availablePrinters: IBLEPrinterIdentity[] = await BLEPrinter.getDeviceList();
      this.printers = availablePrinters;
      return this.printers;

    } catch (error) {
      console.error('Falha ao descobrir impressoras:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

  /**
   * Conecta a uma impressora específica.
   * @param printer - O objeto da impressora para conectar.
   */
  async connectPrinter(printer: IBLEPrinterIdentity): Promise<void> {
    if (!printer || !printer.deviceName || !printer.innerMacAddress) {
      throw new Error('Dados da impressora inválidos.');
    }
    try {
      await BLEPrinter.connectPrinter( printer.innerMacAddress);
    } catch (error) {
      console.error(`Falha ao conectar à impressora ${printer.deviceName}:${printer.innerMacAddress}`, error);
      throw new Error('Não foi possível conectar à impressora.');
    }
  }

  /**
   * Imprime o conteúdo da etiqueta formatado.
   * @param labelData - Objeto com os dados da etiqueta.
   * @param quantity - A quantidade de vezes para imprimir.
   */
  async printLabel(labelData: { manufacturingDate: string; expiryDate: string }, quantity: number): Promise<void> {
    const { manufacturingDate, expiryDate } = labelData;
    
    // Formata o texto que será enviado para a impressora.
    // Use os comandos da sua impressora (ex: ESC/POS) para formatação avançada.
    const printContent = `
<Printout>
          <Text align='center' fontWidth='2' fontHeight='2'>Recibo Teste</Text>
          <NewLine />
          <Text>Item 1 .................... R$ 10,00</Text>
          <Text>Item 2 .................... R$ 15,50</Text>
          <NewLine />
          <Text align='right' bold='1'>TOTAL: R$ 25,50</Text>
          <NewLine />
          <NewLine />
          <Barcode type='EAN13' height='10'>123456789012</Barcode>
          <NewLine />
          <QRCode size='4'>https://google.com</QRCode>
          <NewLine />
          <NewLine />
          <Text align='center'>Obrigado!</Text>
          <NewLine />
          <NewLine />
        </Printout>
    `;

    try {
      
        await BLEPrinter.print(printContent);
    } catch (error) {
      console.error('Falha durante a impressão:', error);
      throw new Error('Ocorreu um erro ao imprimir a etiqueta.');
    }
  }
}
