/*
	* @author Harry Dale
*/

package com.camelotinteractive.game.publicreative;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Map;
import java.text.DecimalFormat;
import java.util.Collections;
import com.camelotinteractive.game.instant.GameOutcome;
import com.camelotinteractive.game.instant.TicketDataException;
import com.camelotinteractive.game.instant.TicketDataGenerator;
import com.gtech.game.PrizeParameters;


public class Superrich implements TicketDataGenerator {

	private final static int[] PURE_PRIZE_TIERS = {1,2,4,6,9,14,19,24,27,30,32};
	
	private final static int[][] PRIZE_TIERS = {{},
												{1},
												{2},
												{4,4,4,4,4,4,4,4,4,4},
												{4},
												{9,9,9,9,9,9,9,9,9,9,6,6,6},
												{6},
												{9,9,9,9,9},
												{14,14,14,14,14,14,14,14,14,14},
												{9},
												{32,32,32,32,30,30,30,30,30,30,24,24,19,19},
												{14,14},
												{24,24,24,24,24,24,24,24,24,24},
												{30,30,30,30,30,30,30,30,30,30,24,24,24,19},
												{14},
												{32,30,30,27,24,19},
												{30,30,30,30,30,30,30,30,30,30},
												{24,24,24,24,24},
												{32,32,32,32,32,32,32,32,32,32,30,30,30,24},
												{19},
												{32,27,24},
												{32,32,32,32,30,30},
												{30,30,30,30},
												{32,32,32,32,32,32,32,32},
												{24},
												{30,30},
												{32,32,32,32},
												{27},
												{32,30},
												{32,32,32},
												{30},
												{32,32},
												{32}
		};
	
	private final static int LOSING_TIER = 33;
	
	
	private PrizeParameters prizeParams = null;
	
	private int loserPos = 0;
	private int luckySymG3 = -1;
	private int luckySymG4 = -1;
	
	
	public String getTicketData(GameOutcome gameOutcome)
		throws com.camelotinteractive.game.instant.TicketDataException {
	    // Check for null objects and throw errors if necessary
	    if (gameOutcome == null) {
	        throw new TicketDataException("Null GameOutcome object");
	    }
	    if (prizeParams == null) {
	        throw new TicketDataException("Null PrizeParameters object");
	    }		
		return setVariables(gameOutcome);
	}
	
	private String setVariables(GameOutcome gameOutcome) {
		
		int tier = gameOutcome.getTierNumber();
		int i;
		ArrayList<String> prizeList = new ArrayList<String>();
		ArrayList<String> justPrizes = new ArrayList<String>();
		ArrayList<String> allPrizes = new ArrayList<String>();
		ArrayList<String> allPrizesStatic = new ArrayList<String>();
		for(i = 0; i < PURE_PRIZE_TIERS.length; i++){
			allPrizes.add(formatDecimal(prizeParams.getAmount(PURE_PRIZE_TIERS[i])));
			allPrizes.add(formatDecimal(prizeParams.getAmount(PURE_PRIZE_TIERS[i])));
			allPrizesStatic.add(formatDecimal(prizeParams.getAmount(PURE_PRIZE_TIERS[i])));
		}
		//Create empty prize list
		for(i = 0; i < 14; i++){
			prizeList.add("0");
		}
		boolean isLose = true;
		
		//Adds prizes won
		 if(tier != LOSING_TIER){
			 int len = PRIZE_TIERS[tier].length;
			 int j;
			 for(j = 0; j < len; j++) {
				 justPrizes.add(formatDecimal(prizeParams.getAmount((PRIZE_TIERS[tier][j]))));
			 }
			 isLose = false;
			 Collections.shuffle(justPrizes);
			 int k = 0;
			 for(j = 0; j < justPrizes.size(); j++){
				 prizeList.set(j, justPrizes.get(k));
				 k++;
			 }
		 }
		 //Generate losing prizes
		Collections.shuffle(prizeList);
		int extraLosers = 14;
		int losersNeeded;
		ArrayList<String> loserListTemp = new ArrayList<String>();
		ArrayList<String> loserList = new ArrayList<String>();
		 if(tier != LOSING_TIER){
			 losersNeeded = extraLosers - PRIZE_TIERS[tier].length;
		 }else{
			 losersNeeded = extraLosers;
		 }
		loserListTemp.add(formatDecimal(prizeParams.getAmount(PURE_PRIZE_TIERS[0])));
		loserListTemp.add(formatDecimal(prizeParams.getAmount(PURE_PRIZE_TIERS[PURE_PRIZE_TIERS.length - 1])));
		Collections.shuffle(loserListTemp);	
		loserList.add(loserListTemp.get(0));
		loserList.add(loserListTemp.get(1));
		if(losersNeeded >= 2){
			losersNeeded -= 2;
			if(losersNeeded > 0){
				Collections.shuffle(allPrizes);	
				for(i = 0; i < losersNeeded; i++){
					loserList.add(allPrizes.get(i));
				}
			}
		}
		Collections.shuffle(loserList);	
		loserPos = 0;
		//Generate Game data.
		String gameOne = generateGameOne(prizeList, allPrizesStatic,loserList);
		String gameTwo = generateGameTwo(prizeList, isLose, allPrizesStatic, loserList);	
		String gameThree = generateGameThree(prizeList, allPrizesStatic, loserList);	
		String gameFour = generateGameFour(prizeList, allPrizesStatic, loserList);	
		return appendXML(tier, gameOutcome, gameOne, gameTwo, gameThree, gameFour, allPrizesStatic);
	}
	
	//Generates string containing data for game four
	private String generateGameFour(ArrayList<String> prizeList, ArrayList<String> allPrizes, ArrayList<String> losers) {
		String gameString = "<game n=\"matchOneNumber\">";
		int symbols = 9;
		int i;
		int k = 0;
		ArrayList<Integer> syms = new ArrayList<Integer>();
		for(i = 1; i <= symbols; i++){
			syms.add(i);
		}
		Collections.shuffle(syms);
		luckySymG4 = syms.get(k);
		k++;
		for(i = 10; i < 14; i++){
			if(prizeList.get(i).equals("0")){
				gameString += "<turn n=\"t"+i+"\" v=\""+syms.get(k)+"|"+losers.get(loserPos)+"\" p=\"-1\" w=\"0\"/>";
				k++;
				loserPos++;
			}else{
				gameString += "<turn n=\"t"+i+"\" v=\""+luckySymG4+"|"+prizeList.get(i)+"\" p=\""+allPrizes.indexOf(prizeList.get(i))+"\" w=\"1\"/>";
				k++;
			}
		}
		gameString += "</game>";
		return gameString;
	}

	//Generates string containing data for game two
	private String generateGameTwo(ArrayList<String> prizeList, boolean isLose, ArrayList<String> allPrizes, ArrayList<String> losers) {
		ArrayList<String>game = new ArrayList<String>();
		ArrayList<String> colTotals = new ArrayList<String>();
		ArrayList<String> totalSums = new ArrayList<String>();
		colTotals.add(Integer.toString(0));
		colTotals.add(Integer.toString(0));
		colTotals.add(Integer.toString(0));
		int total = 7;
		int max = 6;
		int min = 1;
		boolean needNear = true;
		boolean lastGo = false;
		String gameString = "<game n=\"equalsSeven\">";
		for(int i = 3; i < 6; i++){
			if(i == 5){
				lastGo = true;
			}
			if(prizeList.get(i).equals("0")){
				game.add(createLoseAdd(needNear, colTotals, total, max, min, lastGo, totalSums));
				needNear = false;
				gameString += "<turn n=\"t"+i+"\" v=\""+game.get(game.size() - 1)+"|"+losers.get(loserPos)+"\" p=\"-1\" w=\"0\" />";
				loserPos++;
			}else{
				game.add(createWinAdd(colTotals, total, max, min, lastGo));
				gameString += "<turn n=\"t"+i+"\" v=\""+game.get(game.size() - 1)+"|"+prizeList.get(i)+"\" p=\""+allPrizes.indexOf(prizeList.get(i))+"\" w=\"1\" />";
			}
		}
		gameString += "</game>";
		return gameString;
	}

	//Create winning data for game two
	private String createWinAdd(ArrayList<String> colTotals, int total, int max, int min, boolean lastGo) {
		int num1;
		int num2;
		num1 = getNumOne(min, max, total, total, lastGo, colTotals);
		num2 = total - num1;
		 int col1Tot = Integer.parseInt(colTotals.get(0));
		 int col2Tot = Integer.parseInt(colTotals.get(1));
		 int col3Tot = Integer.parseInt(colTotals.get(2));
		 col1Tot += num1;
		 col2Tot += num2;
		 col3Tot += total;
		 colTotals.set(0,Integer.toString(col1Tot));
		colTotals.set(1, Integer.toString(col2Tot));
		colTotals.set(2, Integer.toString(col3Tot));
		String gameString = num1+","+num2+","+total;
		return gameString;
	}

	//Create losing data for game two
	private String createLoseAdd(boolean needNear, ArrayList<String> colTotals, int total, int max, int min, boolean lastGo, ArrayList<String> totalSums) {
		int totalNeeded;
		int num1;
		int num2;
		int i;
		ArrayList<Number> posTotals = new ArrayList<Number>();
		if(needNear){
			for(i = (total - 2); i <= (total + 2); i++){
				if((i != total) && (totalSums.indexOf(Integer.toString(i)) == -1)){
					if(lastGo){
					 int col1Chk = Integer.parseInt(colTotals.get(2));
						if( (col1Chk + i) != total){
							posTotals.add(i);
						}
					}else{
						posTotals.add(i);
					}
				}
			}
		}else{
			int modifier = 2;
			
			if(lastGo){
					modifier = 5;
			}
			
			for(i = (min + (min * modifier)); i <= (max + (max - min)); i++){
				if((i != total) && (totalSums.indexOf(Integer.toString(i)) == -1)){
					if(lastGo){
					 int col1Chk = Integer.parseInt(colTotals.get(2));
						if( (col1Chk + i) != total){
							posTotals.add(i);
						}
					}else{
						posTotals.add(i);
					}
				}
			}
		}
		Collections.shuffle(posTotals);
		totalNeeded = (Integer)posTotals.get(0);
		totalSums.add(Integer.toString(totalNeeded));
		if(totalNeeded <= max){
			num1 = getNumOne(min, (totalNeeded - 1), totalNeeded, total, lastGo, colTotals);
		}else{
			int localMin = totalNeeded - max;
			num1 = getNumOne(localMin, (max), totalNeeded, total, lastGo, colTotals);
		}
		num2 = totalNeeded - num1;
		 int col1Tot = Integer.parseInt(colTotals.get(0));
		 int col2Tot = Integer.parseInt(colTotals.get(1));
		 int col3Tot = Integer.parseInt(colTotals.get(2));
		 col1Tot += num1;
		 col2Tot += num2;
		 col3Tot += totalNeeded;
		 colTotals.set(0,Integer.toString(col1Tot));
		colTotals.set(1, Integer.toString(col2Tot));
		colTotals.set(2, Integer.toString(col3Tot));
		String gameString = num1+","+num2+","+totalNeeded;
		return gameString;
	}

	//Get secondary number for game two
	private int getNumOne(int min, int max, int totalNeeded, int total, boolean lastGo, ArrayList<String> colTotals) {
		ArrayList<Number> posTotals = new ArrayList<Number>();
		double checker = (double)totalNeeded;
		for(int i = min; i <= max; i++){
			if((checker / i) != 2){
				if(lastGo){
					 int col1Chk = Integer.parseInt(colTotals.get(0));
					 int col2Chk = Integer.parseInt(colTotals.get(1));
						if( (col1Chk + i) != total){
							if( ((totalNeeded - i) +  col2Chk) != total){
								posTotals.add(i);
							}
						}
				}else{
					posTotals.add(i);
				}
			}
		}
		Collections.shuffle(posTotals);
		if(posTotals.size() == 0){
			
		}
		return (Integer)posTotals.get(0);
	}
	
	//Generates string containing data for game three
	private String generateGameThree(ArrayList<String> prizeList, ArrayList<String> allPrizes, ArrayList<String> losers) {
		String gameString = "<game n=\"matchOne\">";
		int symbols = 6;
		int i;
		int k = 0;
		ArrayList<Integer> syms = new ArrayList<Integer>();
		for(i = 0; i < symbols; i++){
			syms.add(i);
		}
		Collections.shuffle(syms);
		luckySymG3 = syms.get(k);
		k++;
		for(i = 6; i < 10; i++){
			if(prizeList.get(i).equals("0")){
				gameString += "<turn n=\"t"+i+"\" v=\""+syms.get(k)+"|"+losers.get(loserPos)+"\" p=\"-1\" w=\"0\"/>";
				k++;
				loserPos++;
			}else{
				gameString += "<turn n=\"t"+i+"\" v=\""+luckySymG3+"|"+prizeList.get(i)+"\" p=\""+allPrizes.indexOf(prizeList.get(i))+"\" w=\"1\"/>";
				k++;
			}
		}
		gameString += "</game>";
		return gameString;
	}
	
	//Create winning data for game one
	private String generateGameOne(ArrayList<String> prizeList, ArrayList<String> allPrizes, ArrayList<String> losers) {
		String gameString = "<game n=\"matchTwo\">";
		int symbols = 8;
		int i;
		int k = 0;
		ArrayList<Integer> syms = new ArrayList<Integer>();
		for(i = 0; i < symbols; i++){
			syms.add(i);
		}
		Collections.shuffle(syms);
		for(i = 0; i < 3; i++){
			if(prizeList.get(i).equals("0")){
				gameString += "<turn n=\"t"+i+"\" v=\""+syms.get(k)+","+syms.get(k + 1)+"|"+losers.get(loserPos)+"\" p=\"-1\" w=\"0\"/>";
				k += 2;
				loserPos++;
			}else{
				gameString += "<turn n=\"t"+i+"\" v=\""+syms.get(k)+","+syms.get(k)+"|"+prizeList.get(i)+"\" p=\""+allPrizes.indexOf(prizeList.get(i))+"\" w=\"1\"/>";
				k++;
			}
		}
		gameString += "</game>";
		return gameString;
	}

	//Appends the individual game strings to the final XML
	private String appendXML(int tier, GameOutcome gameOutcome, String gameOne, String gameTwo, String gameThree, String gameFour,  ArrayList<String> allPrizesStatic) {
	    String win = gameOutcome.isWinner()?"1":"0";
	    int i = 0;
	    StringBuilder xml = new StringBuilder();
	    xml.append("<?xml version='1.0' encoding='UTF-8' ?>");
	    xml.append("<ticket>");
	    xml.append("<outcome prizeTier=\""+tier+"\" amount=\""+formatDecimal(prizeParams.getAmount(tier))+ "\" isWinner=\""+win+"\"/>");
	    
	    xml.append("<params g3=\""+luckySymG3+"\" g4=\""+luckySymG4+"\" superWin=\""+formatDecimal(prizeParams.getAmount(1))+"\"/>");
	    xml.append("<prizeList a=\""); 
	    for(i = 0; i < allPrizesStatic.size(); i++){
	    	xml.append(allPrizesStatic.get(i));
	    	if(i < (allPrizesStatic.size()-1)){
	    		xml.append(",");
	    	}
	    }
	    xml.append("\"/>");
	    xml.append("<games>");
	    xml.append(gameThree);
	    xml.append(gameFour);	    
	    xml.append(gameTwo);
	    xml.append(gameOne);	    	    
	    xml.append("</games>");
	    xml.append("</ticket>");
	    return xml.toString();
	}

	private String formatDecimal(BigDecimal bd) {
		final String format = "0.00#";
	    DecimalFormat df = new DecimalFormat(format);
	    return df.format(bd.doubleValue());
	}

	public void setCustomConfig(Map map) {
		
	}
	public void setPrizeParameters(PrizeParameters prizeParams) {
	      this.prizeParams = prizeParams;
	}
}